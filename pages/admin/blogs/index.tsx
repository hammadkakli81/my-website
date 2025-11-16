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
        <div className="w-full min-h-screen p-10 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-sky-500/5 to-yellow-500/5"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
              <h1 className="heading-secondary text-gray-800 mb-0">
                All Blogs
              </h1>
              <Link
                href="/admin/blogs/create"
                className="btn btn--primary"
              >
                Create new Blog
              </Link>
            </div>
            <BlogsComponent forAdmin blogs={blogs} />
          </div>
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
