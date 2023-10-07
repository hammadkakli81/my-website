import { NextApiHandler } from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '../../auth/[...nextauth]';
import Training from '../../../../models/training';
import { connectDB } from '../../../../utils/connect-db';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    await connectDB();
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const { training } = req.body;

    try {
      await Training.create(training);

      await Promise.all([
        res.revalidate('/'),
        res.revalidate('/trainings'),
        res.revalidate(`/trainings/${req.body.training.slug}`),
      ]);

      return res.send({ message: 'Successfully Created the Training!' });
    } catch (err) {
      console.log('🚀🚀🚀', err);
      return res.status(400).send({ message: "Couldn't create the training!" });
    }
  } else if (req.method === 'PATCH') {
    await connectDB();
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const { training } = req.body;

    try {
      await Training.findByIdAndUpdate(
        training._id,
        { ...training },
        { runValidators: true }
      );

      await Promise.all([
        res.revalidate('/'),
        res.revalidate('/trainings'),
        res.revalidate(`/trainings/${req.body.training.slug}`),
      ]);

      return res.send({ message: 'Updated training successfully!' });
    } catch (err) {
      console.log('🚀🚀🚀🚀', err);
      return res.status(400).send({ message: "Couldn't update the trainings" });
    }
  } else res.status(500).send({ message: "Endpoint doesn't exist" });
};

export default handler;
