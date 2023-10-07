import { NextApiHandler } from 'next';

import { catchAsync } from '../../../../utils/catch-async';
import { Blog, User } from '../../../../models/comment';
import { connectDB } from '../../../../utils/connect-db';
import { requireAdmin } from '../../../../utils';
import { getBlogs } from '@/utils/blogs.utils';

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'PATCH':
      return updateUser(req, res);

    default:
      const error = [{ message: 'No Endpoint exists' }];
      return res.status(404).send({ error });
  }
};

const updateUser = catchAsync(async (req, res) => {
  const { user } = await requireAdmin(req, res);

  await connectDB();

  const updatedUser = await User.findByIdAndUpdate(
    user.id,
    { ...req.body },
    { runValidators: true, new: true }
  );

  const promises = (
    await Blog.find({ author: updatedUser?.id }).select('slug')
  ).map(({ slug }) => res.revalidate(`/blogs/${slug}`));

  await Promise.all(promises);

  res.status(200).send({ user: updatedUser });
});

export default handler;
