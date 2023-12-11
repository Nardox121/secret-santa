import { Add24Regular, Dismiss24Regular } from '@fluentui/react-icons';
import { Button, Input, makeStyles, mergeClasses, shorthands, Text } from "@fluentui/react-components";
import { useState } from "react";
import { Loader } from '@/components/Loader';
import { CreateRoomResponse, Result } from '@/components/Result';

export default function Create() {
  const styles = useStyles();
  const [input, setInput] = useState<string>('');
  const [participants, setParticipants] = useState<string[]>([]);

  const [response, setResponse] = useState<CreateRoomResponse | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateRoom = async (participants: string[]) => {
    setIsLoading(true);
    const body = {
      participants
    };

    const response = await fetch('/api/create-room', {
      method: 'POST',
      body: JSON.stringify(body)
    })

    const json = await response.json();
    if (!response.ok) {
      setResponse({
        success: false,
        error: json.message,
      });
    } else {
      setResponse({
        success: true,
        data: json.room,
      });
    }
    setIsLoading(false);
  }

  return isLoading ? (
    <Loader />
  ) : response === undefined ? (
    <div className={styles.container}>
      <div className={styles.addParticipantContainer}>
        <Text
          className={styles.addParticipantTitle}
          size={600}
          weight="semibold">
          Add another participant!
        </Text>
        <div className={styles.row}>
          <Input value={input} onChange={(_, data) => setInput(data.value)} />
          <Button
            icon={<Add24Regular />}
            disabled={input.length === 0 || participants.includes(input)}
            onClick={() => {
              setParticipants(x => [...x, input]);
              setInput('');
            }}
          />
        </div>
      </div>
      <div className={styles.participantContainer}>
        {participants.map((x, i) => (
          <div key={x} className={styles.row}>
            <Text size={600} className={styles.participant}>{`${i + 1}. ${x}`}</Text>
            <Button
              size="small"
              icon={<Dismiss24Regular />}
              onClick={() => {
                setParticipants(x => {
                  const copy = [...x];
                  copy.splice(i, 1);
                  return copy;
                });
              }}
            />
          </div>
        ))}
      </div>
      <div className={mergeClasses(styles.manageRoomSection, styles.row)}>
        <Button
          className={styles.manageRoomButton}
          icon={<Dismiss24Regular />}
          iconPosition="after"
          onClick={() => setParticipants([])}
        >
          Clear
        </Button>
        <Button
          className={styles.manageRoomButton}
          disabled={participants.length <= 2}
          onClick={() => generateRoom(participants)}
        >
          Generate
        </Button>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <Result roomResponse={response} />
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    ...shorthands.padding('20px')
  },
  controlContainer: {
    display: 'flex',
    width: '30%',
    height: '100%'
  },
  participantContainer: {
    width: '70%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    ...shorthands.gap('10px')
  },
  addParticipantContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    ...shorthands.gap('10px'),
  },
  addParticipantTitle: {
    color: '#FFFFFF'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    height: 'fit-content',
    ...shorthands.gap('10px'),
  },
  participant: {
    color: '#FFFFFF'
  },
  manageRoomSection: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '250px',
    height: '100px',
  },
  manageRoomButton: {
    height: '50px',
    width: '100px'
  },
});