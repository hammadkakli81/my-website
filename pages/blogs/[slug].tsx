import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import dateformat from 'dateformat';

import Head from 'next/head';
import Layout from '../../components/layout/layout';
import { useEffect } from 'react';
import Image from 'next/image';
import { Comments } from '../../components/comments/comments';
import { getBlog, getBlogs } from '../../utils/blogs.utils';
import { Blog } from '../../common-types/blog';

const BlogPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
}) => {
  useEffect(() => {
    document.querySelector('html')!.style!.fontSize = '100%';

    return () => {
      document.querySelector('html')!.style!.fontSize = '62.5%';
    };
  }, []);

  if (!blog) return null;

  return (
    <>
      <Head>
        <title>{blog.title} | Hammad</title>
        <meta name="description" content={blog.meta} />

        <meta property="og:title" content={`${blog.title} | Hammad`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={blog.thumbnail?.src} />
        <meta
          property="og:url"
          content={`https://hammadkakli.com/blogs/${blog.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="og:description" content={blog.meta} />
        <meta property="og:site_name" content="Hammad Kakli" />
        <meta name="twitter:image:alt" content={blog.title} />

        <meta
          property="fb:app_id"
          content="55ad85864cc945a261024af7397b8bffed401fea700f5ea9aa54e1c990e2029d"
        />
        <meta name="twitter:site" content="@hammadkakli"></meta>
      </Head>
      <Layout>
        <div className="py-5 md:py-20">
          <div className="container-small">
            <div className="mb-14 sm:mb-10 bg-primary-dark pl-7 pr-2 py-3 sm:rounded-md scale-[1.183] sm:scale-100">
              <h1 className="font-extrabold text-xl md:text-4xl text-white">
                {blog!.title}
              </h1>
            </div>

            {blog.thumbnail && blog.thumbnail.src && (
              <div className="mb-10">
                <Image
                  alt="Blog Thumbnail"
                  src={blog!.thumbnail!.src}
                  height={775}
                  width={500}
                  className="w-full h-auto sm:rounded-md scale-[1.183] sm:scale-100"
                />
              </div>
            )}

            <div className="flex items-center justify-center">
              <div
                className="w-full prose-lg prose-a:text-white prose-a:underline prose-a:p-1 prose-a:bg-gray-900 prose-a:rounded"
                dangerouslySetInnerHTML={{ __html: blog!.content }}
              />
            </div>

            <div className="pt-5">
              <div className="rounded border-2 border-secondary-dark p-2">
                <h2 className="font-bold underline mb-2">Admin</h2>

                <div className="flex items-start">
                  <div className="w-12">
                    <div className="relative aspect-square">
                      <Image
                        className="rounded"
                        src={blog.author.avatar!}
                        alt={blog.author.name}
                        layout="fill"
                      />
                    </div>
                  </div>

                  <div className="ml-2 -mt-1 flex-1">
                    <h4 className="font-semibold text-primary-dark dark:text-primary">
                      {blog.author.name}
                    </h4>
                    <p className="text-primary-dark opacity-90 dark:text-primary">
                      {blog.author.bio || 'No Bio'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 w-full flex items-center justify-between">
              <div>
                <span className="font-semibold">Created at: </span>
                {dateformat(blog.createdAt, 'd-mmm-yyyy')}
              </div>
              <div>
                <span className="font-semibold">Updated at: </span>
                {dateformat(blog.updatedAt, 'd-mmm-yyyy')}
              </div>
            </div>

            <div className="py-10">
              <h2 className="text-4xl font-semibold underline translate-y-16">
                Comments
              </h2>
              <Comments postId={blog._id} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

interface StaticReturnType {
  blog: Blog;
}

// Build the pages with this data (service)
export const getStaticProps: GetStaticProps<
  StaticReturnType
> = async context => {
  const slug = context.params!.slug as string;
  const blog = await getBlog(slug);

  return {
    props: { blog: blog! },
    notFound: !blog,
  };
};

// Which pages we want to build (currently all of them)
export const getStaticPaths: GetStaticPaths = async () => {
  const allBlogs = await getBlogs(
    '-content -meta -tags -title -thumbnail -author'
  );

  const paths = allBlogs.map(({ slug }) => {
    return { params: { slug } };
  });

  return {
    paths,
    // We have built as many pages, as their all whole blogs
    fallback: true,
  };
};

export default BlogPage;
