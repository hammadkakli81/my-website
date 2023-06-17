import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import AdminLayout from '../../../components/admin/admin-layout';
import { type Training } from '../../../common-types/training';
import { getTrainings } from '../../../utils/trainings.utils';
import UpdateTrainingsComponent from '../../../components/admin/trainings/update-trainings';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const UpdateTrainings: NextPage<Props> = props => {
  return (
    <>
      <Head>
        <title>Admin Trainings | Hammad</title>
      </Head>
      <AdminLayout>
        <UpdateTrainingsComponent trainings={props.trainings} />
      </AdminLayout>
    </>
  );
};

type Returned = { trainings: Training[] };

export const getServerSideProps: GetServerSideProps<Returned> = async () => {
  const trainings = await getTrainings();

  return { props: { trainings } };
};

export default UpdateTrainings;
