import '../styles/main.scss';
import { AppProps } from 'next/app';
import { Fragment } from 'react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { NotificationContextProvider } from '../contexts/notification-context';

// pm2 start npm -- start
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <NotificationContextProvider>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </NotificationContextProvider>
    </Fragment>
  );
};

export default App;
