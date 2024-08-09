import { NextApiHandler } from 'next';
import { getServerSession } from 'next-auth';

import ServiceModal from '../../../models/service';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '../../../utils/connect-db';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'PATCH') {
    await connectDB();
    const { id, services } = req.body;
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
      await ServiceModal.findByIdAndUpdate(id, {
        services: { data: services },
      });

      await res.revalidate('/');
      await res.revalidate('/services');

      return res.send({ message: 'Updated services successfully!' });
    } catch (err) {
      return res.status(400).send({ message: "Couldn't save the services" });
    }
  }

  res.status(500).send({ message: "Endpoint doesn't exist" });
};

export default handler;
