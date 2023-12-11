import clientPromise from '@/lib/mongodb';
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateGuid } from '@/lib/random';
import { RoomDocument } from './create-room';

interface Body {
  roomId: string;
  participantId: string;
}

type ResponseData = {
  message: string;
  pairing?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let client: MongoClient;
  let body: Body;
  try {
    client = await clientPromise;
    body = JSON.parse(req.body);
  }
  catch (e) {
    res.status(400).json({ message: 'Bad request' });
    return;
  }

  const db = client.db('SecretSanta');
  const roomCollection = db.collection('Rooms');
  const query = { id: body.roomId };
  const queryOptions = {
    projection: { _id: 0, id: 1, participants: 1 }
  };

  try {
    const response = await roomCollection.findOne(query, queryOptions);
    if (response === null) {
      res.status(404).json({ message: '404' });
      return;
    }
    const room = response as unknown as RoomDocument;
    const participant = room.participants.find(x => x.id === body.participantId);
    if (!participant) {
      res.status(404).json({ message: '404' });
      return;
    }

    if (participant.seenResult) {
      res.status(409).json({ message: '404' });
      return;
    }

    const filter = { id: room.id };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        participants: [
          ...room.participants.filter(x => x.id !== participant.id),
          {
            ...participant,
            seenResult: true
          }
        ]
      }
    }

    const result = await roomCollection.updateOne(filter, updateDoc, options);
    console.log({ result });
    res.status(200).json({ message: 'Ok', pairing: participant.pairing });
  }
  catch {
    res.status(404).json({ message: '404' });
    return;
  }
}