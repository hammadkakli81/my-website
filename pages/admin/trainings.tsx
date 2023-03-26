import { NextPage } from 'next';
import Head from 'next/head';
import AdminLayout from '../../components/admin/admin-layout';

const Trainings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin Trainings | Hammad</title>
      </Head>
      <AdminLayout>Trainings</AdminLayout>
    </>
  );
};

export default Trainings;
