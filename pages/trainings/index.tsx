import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import TrainingsComponent from '../../components/trainings/all-trainings';
import { Training } from '../../common-types/training';
import Layout from '../../components/layout/layout';
import { getTrainings } from '../../utils/trainings.utils';

const Trainings: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = props => {
  return (
    <>
      <Head>
        <title>Trainings | Hammad</title>
      </Head>
      <Layout>
        <TrainingsComponent trainings={props.trainings} />
      </Layout>
    </>
  );
};

interface StaticPropsReturns {
  trainings: Training[];
}

export const getStaticProps: GetStaticProps<StaticPropsReturns> = async () => ({
  props: { trainings: await getTrainings('-description') },
});

export default Trainings;
