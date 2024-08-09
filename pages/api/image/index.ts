import type { NextApiHandler } from 'next';
import formidable from 'formidable';
import { cloudinary } from '@/lib/cloudinary';
import { catchAsync } from '@/utils/catch-async';

const folder_name = 'hammad-website/blogs';
export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      return getAllImages(req, res);

    case 'POST':
      return uploadNewImage(req, res);

    default:
      return res.status(404).send({ error: 'No Endpoint exists' });
  }
};

const getAllImages = catchAsync(async (_, res) => {
  const { resources } = await cloudinary.api.resources({
    resource_type: 'image',
    type: 'upload',
    prefix: folder_name,
  });

  const images = resources.map(({ secure_url, public_id }: any) => ({
    src: secure_url,
    public_id,
  }));

  res.send({ images });
});

const uploadNewImage = catchAsync(async (req, res) => {
  const form = formidable();

  const [fields, files] = await form.parse(req);

  // this 'prop' will come from frontend
  const imageFile = files.image![0];

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    imageFile.filepath,
    { folder: folder_name }
  );

  res.send({ src: secure_url, public_id });
});

export default handler;
