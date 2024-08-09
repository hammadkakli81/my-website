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

const ServicesPage: NextPage<Props> = ({ services, id }) => {
  return (
    <>
      <Head>
        <title>Admin Services | Hammad</title>
      </Head>
      <AdminLayout>
        <UpdateServices services={services} id={id} />
      </AdminLayout>
    </>
  );
};

type Returned = { services: Service[]; id: string };

export const getServerSideProps: GetServerSideProps<Returned> = async () => {
  const { data: services, id } = await getServices();

  return { props: { services, id } };
};

export default ServicesPage;
