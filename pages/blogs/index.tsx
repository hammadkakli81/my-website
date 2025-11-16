import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/layout';
import { getBlogs } from '@/utils/blogs.utils';
import { Blog } from '@/common-types/blog';
import { Blogs } from '@/components/blogs';
import Link from 'next/link';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const BlogsPage: NextPage<Props> = ({ blogs }) => {
  return (
    <>
      <Head>
        <title>All Blogs | Hammad</title>
      </Head>
      <Layout>
        <div className="relative min-h-[80vh] py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-yellow-500/10"></div>
          <div className="container relative z-10">
            <div className="py-16">
              <h1 className="heading-secondary heading-secondary--white mb-10">
                Blogs
              </h1>
              <Blogs blogs={blogs} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

type Returned = { blogs: Blog[] };

export const getStaticProps: GetStaticProps<Returned> = async () => {
  const blogs = await getBlogs('-content');

  return { props: { blogs } };
};

export default BlogsPage;
