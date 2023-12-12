import { Link, makeStyles, shorthands, Text } from "@fluentui/react-components";
import { ErrorCircle48Regular } from '@fluentui/react-icons';

export interface CreateRoomResponse {
  success: boolean;
  error?: string;
  data?: Record<string, string>;
}

export const Result = (props: { roomResponse: CreateRoomResponse }) => {
  const styles = useStyles();
  return props.roomResponse.success ? (
    <div className={styles.container}>
      <Text
        className={styles.successTitle}
        size={700}
        align="center"
      >
        Congratulations! Use links below to reveal your assignments. Don&apos;t cheat - we will know!
      </Text>
      <div className={styles.scrollContainer}>
        {Object.entries(props.roomResponse.data!).map(([name, link]) => (
          <div key={name}>
            <Text
              size={700}
              className={styles.participant}
              weight="semibold"
            >
              {`${name}: `}
            </Text>
            <Link className={styles.link} appearance="subtle" href={link}>
              <Text size={600}>
                {link}
              </Text>
            </Link>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <ErrorCircle48Regular className={styles.errorIcon} />
      <Text
        className={styles.successTitle}
        size={800}
      >
        {props.roomResponse.error && `Sorry. We were unable to process your request due to error: ${props.roomResponse.error}`}
      </Text>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    overflowY: 'auto',
  },
  successTitle: {
    marginBottom: '15px',
    color: '#FFFFFF'
  },
  participant: {
    color: '#FFFFFF'
  },
  link: {
    color: '#FFFFFF',
    textDecorationColor: '#FFFFFF',
    ':hover': {
      color: '#FFFFFF',
    }
  },
  errorIcon: {
    color: 'white',
    height: '72px',
    width: '72px',
    marginBottom: '20px'
  }
});