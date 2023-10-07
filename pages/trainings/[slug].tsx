import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';

import Head from 'next/head';
import { Training } from '../../common-types/training';
import SingleTraining from '../../components/trainings/single-training';
import Layout from '../../components/layout/layout';
import { getTraining, getTrainings } from '../../utils/trainings.utils';

const TrainingPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = props => {
  return (
    <>
      <Head>
        <title>{props.training?.name} | Hammad</title>
      </Head>
      <Layout>
        <SingleTraining training={props.training} />
      </Layout>
    </>
  );
};

interface StaticReturnType {
  training: Training | null;
}

// Build the pages with this data (service)
export const getStaticProps: GetStaticProps<
  StaticReturnType
> = async context => {
  const slug = context.params?.slug as string;
  const training = await getTraining(slug);

  return {
    props: { training: training },
    notFound: !training,
  };
};

// Which pages we want to build (currently all of them)
export const getStaticPaths: GetStaticPaths = async () => {
  const allTrainings = await getTrainings('-name -excerptDesc -description');

  const paths = allTrainings.map(training => {
    return { params: { slug: training.slug } };
  });

  return {
    paths,
    // We have built as many pages, as their all whole trainings
    fallback: true,
  };
};

export default TrainingPage;
