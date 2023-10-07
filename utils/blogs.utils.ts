import { Blog } from '@/common-types/blog';
import { Blog as BlogModel } from '@/models/comment';
import { connectDB } from './connect-db';

export const getBlogs = async (select?: string) => {
  try {
    await connectDB();

    const blogs = await BlogModel.find()
      .sort({ createdAt: 'desc' })
      .select(select || '');
    return JSON.parse(JSON.stringify(blogs)) as Blog[];
  } catch (err) {
    console.log('🎇🎇🎇', err);
    return [] as Blog[];
  }
};

export const getBlog = async (slug: string): Promise<Blog | null> => {
  try {
    await connectDB();

    const blog = await BlogModel.findOne({ slug }).populate('author');
    return JSON.parse(JSON.stringify(blog)) as Blog;
  } catch (err) {
    console.log('🎇🎇🎇', err);
    return null;
  }
};
