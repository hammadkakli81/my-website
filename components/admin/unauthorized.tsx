import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';
import styles from './unauthorized.module.scss';

const Unauthorized: FC = () => {
  return (
    <div className={styles.unauthorized}>
      <Head>
        <title>Unauthorized | Hammad</title>
      </Head>
      <h1>Unauthorized.</h1>

      <p>
        You are not authorized to access this page. Only admins can access this
        page.
      </p>

      <Link href="/admin/signin">
        <a className="btn-admin">Sign in as Admin</a>
      </Link>
    </div>
  );
};

export default Unauthorized;
