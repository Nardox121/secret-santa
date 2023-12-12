import clientPromise from '@/lib/mongodb';
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateGuid } from '@/lib/random';

interface Body {
  participants?: string[];
}

interface Participant {
  id: string;
  name: string;
  link: string;
  pairing: string;
  seenResult: boolean;
}

export interface RoomDocument {
  id: string;
  participants: Participant[];
}

type RoomResponse = Record<string, string>;

type ResponseData = {
  message: string;
  room?: RoomResponse;
}

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const isDev = process.env.NODE_ENV == 'development';

const findDuplicates = (array: string[]) => array.filter((item, index) => array.indexOf(item) !== index);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let client: MongoClient;
  let body: Body;
  try {
    client = await clientPromise;
    body = JSON.parse(req.body);
    if (!body.participants) {
      res.status(400).json({ message: 'Invalid request body: people parameter should not be empty' });
      return;
    }

    if (body.participants!.length <= 2) {
      res.status(400).json({ message: 'Secret Santa should have at least 3 participants' });
      return;
    }

    const duplicates = findDuplicates(body.participants);
    if (duplicates.length > 0) {
      res.status(400).json({ message: `Duplicate name(s): ${duplicates.join(', ')}` });
      return;
    }
  }
  catch (e) {
    res.status(400).json({ message: 'Bad request' });
    return;
  }

  const db = client.db('SecretSanta');
  const collection = db.collection('Rooms');

  const hostName = req.headers.host;
  const roomId = generateGuid();
  const pairings = [...body.participants];
  shuffleArray(pairings);
  const pairingEntries = pairings.map((x, i) => {
    const pairIndex = i === 0 ? pairings.length - 1 : i - 1;
    return [x, pairings[pairIndex]];
  });

  const pairingMap = Object.fromEntries(pairingEntries);
  const roomDocument: RoomDocument = {
    id: roomId,
    participants: body.participants.map(x => {
      const id = generateGuid();
      return {
        id,
        name: x,
        link: `${isDev ? 'http' : 'https'}://${hostName}/${roomId}/${id}`,
        seenResult: false,
        pairing: pairingMap[x]
      }
    })
  }

  collection.insertOne(roomDocument);
  const response: RoomResponse = Object.fromEntries(roomDocument.participants.map(x => [x.name, x.link]));
  res.status(200).json({ message: 'Room created successfully', room: response });
}