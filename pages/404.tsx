import styles from './404.module.scss';
import Link from 'next/link';
import Head from 'next/head';
import { NextPage } from 'next';
import Layout from '../components/layout/layout';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 | Page not found</title>
      </Head>

      <Layout>
        <div className={styles.not_found_page}>
          <div className={styles.not_found_page__content}>
            <p
              className={styles.not_found_page__text + ' u-margin-bottom-small'}
            >
              404 | Page not found
            </p>
            <Link className="btn btn--primary u-center-text" href="/">
              Home Page <span className="btn__arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NotFoundPage;
