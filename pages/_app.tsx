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
        <meta
          name="google-site-verification"
          content="BIWOnKCMOqqtffgmv_EVJHSP02dzhw-glqcfnTBAX30"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4518238468475571"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div id="darkmode" className="light">
        <NotificationContextProvider>
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
            <div id="modal"></div>
          </SessionProvider>
        </NotificationContextProvider>
      </div>
    </Fragment>
  );
};

export default App;
