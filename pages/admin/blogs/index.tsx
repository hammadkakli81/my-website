import { Blog } from '@/common-types/blog';
import AdminLayout from '@/components/admin/admin-layout';
import { getBlogs } from '@/utils/blogs.utils';
import { Blogs as BlogsComponent } from '@/components/blogs';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const AdminBlogs: NextPage<Props> = ({ blogs }) => {
  return (
    <>
      <Head>
        <title>Admin Blogs | Hammad</title>
      </Head>
      <AdminLayout>
        <div className="bg-primary-dark w-full min-h-screen p-10">
          <div className="flex justify-between items-center">
            <h1 className="heading-secondary heading-secondary--white mb-10">
              All Blogs
            </h1>
            <Link
              href="/admin/blogs/create"
              style={{
                transform: 'translateY(-8px)',
                backgroundColor: 'white',
                color: '#283045',
              }}
              className="btn"
            >
              Create new Blog
            </Link>
          </div>
          <BlogsComponent forAdmin blogs={blogs} />
        </div>
      </AdminLayout>
    </>
  );
};

type Returned = { blogs: Blog[] };

export const getServerSideProps: GetServerSideProps<Returned> = async () => {
  const blogs = await getBlogs('-content');

  return { props: { blogs } };
};

export default AdminBlogs;
