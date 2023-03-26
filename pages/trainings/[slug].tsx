import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';

import Head from 'next/head';
import { allTrainings } from '../../data/all-trainings';
import { Training } from '../../common-types/training';
import SingleTraining from '../../components/trainings/single-training';
import Layout from '../../components/layout/layout';

const TrainingPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = props => {
  return (
    <>
      <Head>
        <title>{props.training.name} | Hammad</title>
      </Head>
      <Layout>
        <SingleTraining training={props.training} />
      </Layout>
    </>
  );
};

interface StaticReturnType {
  training: Training;
}

// Build the pages with this data (service)
export const getStaticProps: GetStaticProps<StaticReturnType> = context => {
  const slug = context.params?.slug;
  const training = allTrainings.find(training => {
    return training.slug === slug;
  });

  return {
    props: {
      training: training as Training,
    },
    notFound: training === undefined,
  };
};

// Which pages we want to build (currently all of them)
export const getStaticPaths: GetStaticPaths = () => {
  const paths = allTrainings.map(training => {
    return { params: { slug: training.slug } };
  });

  return {
    paths,
    // We have built as many pages, as their all whole trainings
    fallback: false,
  };
};

export default TrainingPage;
