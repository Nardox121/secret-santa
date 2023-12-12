import { Loader } from "@/components/Loader";
import { makeStyles, shorthands, Text } from "@fluentui/react-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Reveal() {
  const router = useRouter();
  const styles = useStyles();
  const [name, setName] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const getResult = async () => {
      if (!router.query.roomId || !router.query.participantId) {
        return;
      }

      const body = {
        roomId: router.query.roomId,
        participantId: router.query.participantId
      };

      const response = await fetch('/api/reveal', {
        method: 'POST',
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const json = await response.json();
        setName(json.pairing);
      } else {
        if (response.status === 409) {
          setError('Your assignment has already been revealed!');
        } else {
          setError('We couldn\'t find this page. Please check if the URL is a correct one.')
        }
      }
    }
    getResult();
  }, [router.query]);

  return name !== undefined ? (
    <div className={styles.container}>
      <Text
        className={styles.successTitle}
        size={700}
        align="center"
      >
        Your assignment is:
      </Text>
      <Text
        className={styles.successTitle}
        size={900}
        weight="semibold"
        align="center"
      >
        {name}
      </Text>
      <Text
        className={styles.successTitle}
        size={600}
        align="center"
      >
        Make sure to write it down!
      </Text>
    </div>
  ) : error !== undefined ? (
    <div className={styles.container}>
      <Text
        className={styles.errorTitle}
        size={800}
      >
        {error}
      </Text>
    </div>
  ) : <Loader />;
}

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    ...shorthands.padding('20px'),
    ...shorthands.gap('5px'),
  },
  successTitle: {
    color: '#FFFFFF'
  },
  errorTitle: {
    color: '#FFFFFF',
    marginBottom: '20px'
  }
})