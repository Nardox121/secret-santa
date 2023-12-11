import { Button, makeStyles, shorthands, Text } from '@fluentui/react-components';
import gift from '../../public/gift.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Link className={styles.link} href="/create">
        <Button
          className={styles.button}
          iconPosition="after"
          icon={<Image src={gift} alt="Gift" />}
        >
          <Text size={500} weight="semibold">Create new room</Text>
        </Button>
      </Link>
    </div>
  )
}

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    ...shorthands.textDecoration('none')
  },
  button: {
    display: 'flex',
    width: '300px',
    height: '80px',
    ...shorthands.padding('10px'),
    ...shorthands.gap('15px'),
    ...shorthands.borderRadius('8px'),
  },
});
