import { cloudinary } from '@/lib/cloudinary';
import { catchAsync } from '@/utils/catch-async';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'DELETE') return deleteImage(req, res);

  return res.status(404).send({ error: 'No Endpoint exists' });
};

const deleteImage = catchAsync(async (req, res) => {
  // @ts-ignore
  const id = req.query.id.join('/');
  await cloudinary.uploader.destroy(id);

  res.send({ message: 'deleted' });
});

export default handler;
