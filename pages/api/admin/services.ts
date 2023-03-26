import { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth';
import fs from 'fs/promises';
import path from 'path';

import { authOptions } from '../auth/[...nextauth]';

const FILE_PATH = path.join(process.cwd(), 'data', 'all-services.json');

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'PATCH') {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
      await fs.writeFile(FILE_PATH, JSON.stringify(req.body));

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
