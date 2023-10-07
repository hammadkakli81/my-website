import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
// Components
import Hero from '../components/home-page/hero';
import FeaturedServices from '../components/home-page/featured-services';
import HomePageTrainings from '../components/home-page/homepage-trainings';
import Layout from '../components/layout/layout';
import { getServices } from '../utils/services.utils';
import { Service } from '../common-types/service';
import { getTrainings } from '../utils/trainings.utils';
import { Training } from '../common-types/training';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ services, trainings }) => {
  return (
    <>
      <Head>
        <title>Home | Hammad</title>
        <meta
          name="description"
          content="Amazon Account Manager || PPC Expert || PL Wholesale Dropshipping Expert || Amazon Evangelist Consultant and Trainer."
        />
      </Head>
      <Layout>
        <Hero />
        <HomePageTrainings trainings={trainings} />
        <FeaturedServices services={services} />
      </Layout>
    </>
  );
};

type Returned = { services: Service[]; trainings: Training[] };

export const getStaticProps: GetStaticProps<Returned> = async () => {
  const { data: services } = await getServices();
  const trainings = await getTrainings('-description');

  return {
    props: { services, trainings },
    revalidate: 24 * 60 * 60, // 5 minutes
  };
};

export default Home;
