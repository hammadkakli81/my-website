import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import Signin from '../../components/admin/signin';
import Layout from '../../components/layout/layout';

const AdminSignin: NextPage = () => {
  return (
    <>
      <Head>
        <title>Signin | Hammad</title>
      </Head>
      <Layout>
        <Signin />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (session) {
    // if already logged in not show signIn page
    return { props: {}, redirect: { destination: '/admin/dashboard' } };
  }

  return {
    props: {},
  };
};

export default AdminSignin;
