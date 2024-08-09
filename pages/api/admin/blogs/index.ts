import { connectDB } from '@/utils/connect-db';
import { NextApiHandler } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { Blog } from '@/models/comment';
import { catchAsync } from '@/utils/catch-async';
import { cloudinary } from '@/lib/cloudinary';
import formidable from 'formidable';

const folder = 'hammad-website/blogs/content';
export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'POST') return createBlog(req, res);

  res.status(404).send({ error: "Endpoint doesn't exist" });
};

const createBlog: NextApiHandler = catchAsync(async (req, res) => {
  await connectDB();

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const form = formidable();

  const [fields, files] = await form.parse(req);
  const finalPost = generateFields(fields);

  // this 'prop' will come from frontend
  if (files.thumbnail) {
    const imageFile = files.thumbnail[0];

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      imageFile.filepath,
      { folder }
    );

    finalPost.thumbnail = { src: secure_url, public_id };
  }

  const blog = await Blog.create(finalPost);

  await Promise.all([
    res.revalidate('/blogs'),
    res.revalidate(`/blogs/${blog.slug}`),
  ]);

  res.send({ message: 'Blog Created' });
});

function generateFields(obj: any) {
  const result: any = {};
  for (const key in obj) {
    result[key] = obj[key][0];
  }
  return result;
}

export default handler;
