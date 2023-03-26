import fs from 'fs/promises';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import path from 'path';
import { Service } from '../../common-types/service';
import AdminLayout from '../../components/admin/admin-layout';
import Services from '../../components/admin/services/services';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const ServicesPage: NextPage<Props> = ({ services }) => {
  return (
    <>
      <Head>
        <title>Admin Services | Hammad</title>
      </Head>
      <AdminLayout>
        <Services services={services} />
      </AdminLayout>
    </>
  );
};

type Returned = { services: Service[] };

export const getServerSideProps: GetServerSideProps<Returned> = async () => {
  const services = (await fs
    .readFile(path.join(process.cwd(), 'data', 'all-services.json'), 'utf-8')
    .then(data => JSON.parse(data))) as Service[];

  return { props: { services } };
};

export default ServicesPage;
