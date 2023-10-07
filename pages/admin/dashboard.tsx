import { NextPage } from 'next';
import Head from 'next/head';
import AdminLayout from '../../components/admin/admin-layout';
import Dashboard from '../../components/admin/dashboard';

const DashboardPage: NextPage = () => {
  return (
    <AdminLayout>
      <Head>
        <title>Admin Dashboard | Hammad</title>
      </Head>
      <Dashboard />
    </AdminLayout>
  );
};

export default DashboardPage;
