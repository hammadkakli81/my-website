import { NextApiHandler } from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '../../auth/[...nextauth]';
import Training from '../../../../models/training';
import { connectDB } from '../../../../utils/connect-db';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'DELETE') {
    await connectDB();
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
      const deletedTraining = await Training.findByIdAndDelete(req.query.id);

      await Promise.all([
        res.revalidate('/'),
        res.revalidate('/trainings'),
        res.revalidate(`/trainings/${deletedTraining.slug}`),
      ]);

      return res.send({ message: 'Successfully deleted the Training!' });
    } catch (err) {
      console.log('🚀🚀🚀', err);
      return res.status(400).send({ message: "Couldn't delete the training" });
    }
  } else res.status(500).send({ message: "Endpoint doesn't exist" });
};

export default handler;
