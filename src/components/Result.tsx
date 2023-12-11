import { makeStyles, Text } from "@fluentui/react-components";
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
        size={800}
      >
        Congratulations! Send out personalized links for the reveal. Don&apos;t cheat - we will know!
      </Text>
      {Object.entries(props.roomResponse.data!).map(([name, link]) => (
        <Text
          key={name}
          size={600}
          className={styles.participant}
        >
          {`${name}: ${link}`}
        </Text>
      ))}
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
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  successTitle: {
    marginBottom: '20px',
    color: '#FFFFFF'
  },
  participant: {
    color: '#FFFFFF'
  },
  errorIcon: {
    color: 'white',
    height: '72px',
    width: '72px',
    marginBottom: '20px'
  }
});