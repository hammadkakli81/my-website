import { connectDB } from '@/utils/connect-db';
import { NextApiHandler } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { catchAsync } from '@/utils/catch-async';
import { Blog } from '@/models/comment';
import { cloudinary } from '@/lib/cloudinary';
import formidable from 'formidable';

const folder = 'hammad-website/blogs/content';
export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'PATCH') {
    return updateBlog(req, res);
  }
  if (req.method === 'DELETE') {
    return deleteBlog(req, res);
  }
};

const deleteBlog = catchAsync(async (req, res) => {
  await connectDB();

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const id = req.query.id;
  const blog = await Blog.findById(id);

  if (!blog) throw new Error('Blog not found');

  if (blog.thumbnail && blog!.thumbnail.src) {
    await cloudinary.uploader.destroy(blog.thumbnail.public_id);
  }

  await Blog.findByIdAndDelete(id);
  await Promise.all([
    res.revalidate('/blogs'),
    res.revalidate(`/blogs/${blog?.slug}`),
  ]);

  res.send({ message: 'Blog Deleted' });
});

const updateBlog = catchAsync(async (req, res) => {
  await connectDB();

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const previousPost = await Blog.findById(req.query.id as string);
  const form = formidable();

  const [fields, files] = await form.parse(req);
  console.log(fields, files);
  const finalPost = generateFields(fields);

  if (files.thumbnail) {
    // remove previous one, and set the new one
    if (previousPost!.thumbnail && previousPost!.thumbnail.public_id) {
      await cloudinary.uploader.destroy(previousPost!.thumbnail.public_id);
    }

    const imageFile = files.thumbnail[0];

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      imageFile.filepath,
      { folder }
    );

    finalPost.thumbnail = { src: secure_url, public_id };
  }

  const blog = await Blog.findByIdAndUpdate(req.query.id as string, finalPost, {
    runValidators: true,
    new: true,
  });

  const promises = [
    res.revalidate('/blogs'),
    res.revalidate(`/blogs/${blog!.slug}`),
  ];
  if (blog!.slug !== previousPost!.slug)
    promises.push(res.revalidate(`/blogs/${previousPost!.slug}`));

  await Promise.all(promises);

  res.send({ message: 'Blog Successfully Updated' });
});

function generateFields(obj: any) {
  const result: any = {};
  for (const key in obj) {
    result[key] = obj[key][0];
  }
  return result;
}

export default handler;
