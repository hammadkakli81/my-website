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
        <div className="bg-primary-dark">
          <div className="container">
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
