import '../styles/main.scss';
import { AppProps } from 'next/app';
import { Fragment } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { NotificationContextProvider } from '../contexts/notification-context';
import { CartProvider } from '@/contexts/cart-context';
import ChatBot from '@/components/ChatBot';

// pm2 start npm -- start
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4518238468475571"
        strategy="afterInteractive" // or "beforeInteractive" or "lazyOnload" based on your needs
        crossOrigin="anonymous"
      />
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="BIWOnKCMOqqtffgmv_EVJHSP02dzhw-glqcfnTBAX30"
        />
      </Head>
      <div id="darkmode" className="light">
        <NotificationContextProvider>
          <CartProvider>
            <SessionProvider session={pageProps.session}>
              <Component {...pageProps} />
              <ChatBot />
              <div id="modal"></div>
            </SessionProvider>
          </CartProvider>
        </NotificationContextProvider>
      </div>
    </Fragment>
  );
};

export default App;
