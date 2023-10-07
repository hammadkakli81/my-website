import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { Service } from '../../common-types/service';
import Layout from '../../components/layout/layout';
import AllServices from '../../components/services/all-services';
import { getServices } from '../../utils/services.utils';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const services: NextPage<Props> = ({ services }) => {
  return (
    <>
      <Head>
        <title>All services | Hammad</title>
      </Head>
      <Layout>
        <AllServices services={services} />
      </Layout>
    </>
  );
};

type Returned = { services: Service[] };

export const getStaticProps: GetStaticProps<Returned> = async () => {
  const { data: services } = await getServices();

  return {
    props: { services },
    revalidate: 24 * 60 * 60, // 1 day
  };
};

export default services;
