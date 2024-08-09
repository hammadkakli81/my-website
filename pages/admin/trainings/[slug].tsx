import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import AdminLayout from '../../../components/admin/admin-layout';
import { type Training } from '../../../common-types/training';
import { getTraining } from '../../../utils/trainings.utils';
import UpdateTrainingComponent from '../../../components/admin/trainings/update-training';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const UpdateTraining: NextPage<Props> = props => {
  return (
    <>
      <Head>
        <title>{props.training?.name} | Update</title>
      </Head>
      <AdminLayout>
        <UpdateTrainingComponent {...props} />
      </AdminLayout>
    </>
  );
};

type Returned = { training: Training };

export const getServerSideProps: GetServerSideProps<Returned> = async ctx => {
  const slug = ctx.params?.slug as string;
  const training = await getTraining(slug);

  return {
    props: { training: training! },
    notFound: !training,
  };
};

export default UpdateTraining;
