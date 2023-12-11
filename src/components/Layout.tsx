import { FluentProvider, Link, makeStyles, shorthands, teamsLightTheme, Text } from "@fluentui/react-components";
import { ReactNode } from "react";
import Snowfall from 'react-snowfall';

export const Layout = (props: { children: ReactNode; }) => {
  const styles = useStyles();

  return (
    <FluentProvider theme={teamsLightTheme}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <Link className={styles.link} href="/">
            <Text size={800} weight="semibold">Secret Santa</Text>
          </Link>
        </div>
        <div className={styles.main}>
          <Snowfall
            style={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
            }}
          />
          {props.children}
        </div>
      </div>
    </FluentProvider>
  )
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh'
  },
  topBar: {
    backgroundColor: '#C50F1F',
    ...shorthands.padding('25px')
  },
  link: {
    color: '#FFFFFF',
    ...shorthands.textDecoration('none'),
    ':hover': {
      color: '#FFFFFF',
      ...shorthands.textDecoration('none'),
    },
    ':active': {
      color: '#FFFFFF',
      ...shorthands.textDecoration('none'),
    }
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#EEACB2'
  }
});