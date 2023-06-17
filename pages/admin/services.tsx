import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import { Service } from '../../common-types/service';
import AdminLayout from '../../components/admin/admin-layout';
import UpdateServices from '../../components/admin/services/update';
import { getServices } from '../../utils/services.utils';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const ServicesPage: NextPage<Props> = ({ services }) => {
  return (
    <>
      <Head>
        <title>Admin Services | Hammad</title>
      </Head>
      <AdminLayout>
        <UpdateServices services={services} />
      </AdminLayout>
    </>
  );
};

type Returned = { services: Service[] };

export const getServerSideProps: GetServerSideProps<Returned> = async () => {
  const services = await getServices();

  return { props: { services } };
};

export default ServicesPage;
