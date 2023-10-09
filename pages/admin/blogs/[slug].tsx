import { useContext, useEffect, useState } from 'react';
import { Editor } from '@/components/admin/editor';
import AdminLayout from '@/components/admin/admin-layout';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { Blog } from '@/common-types/blog';
import { getBlog } from '@/utils/blogs.utils';
import Head from 'next/head';
import axios from 'axios';
import NotificationContext from '@/contexts/notification-context';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Update: NextPage<Props> = ({ blog }) => {
  const [loading, setLoading] = useState(false);
  const notification = useContext(NotificationContext);

  useEffect(() => {
    const html = document.querySelector('html');
    html && (html.style.fontSize = '100%');

    const darkmode = document.getElementById('darkmode');
    darkmode?.classList.remove('light');
    darkmode?.classList.add('dark');

    return () => {
      html && (html.style.fontSize = '62.5%');

      darkmode?.classList.remove('dark');
      darkmode?.classList.add('light');
    };
  }, []);

  if (!blog) return null;

  const submitHandler = async (post: FormData, id?: string) => {
    try {
      notification.hideNotification();
      setLoading(true);
      const { data } = await axios.patch(`/api/admin/blogs/${id}`, post);
      notification.showNotification({
        type: 'success',
        notificationText: data.message,
      });
    } catch (err: any) {
      notification.showNotification({
        type: 'error',
        notificationText:
          err?.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Update Blog | {blog.title}</title>
      </Head>
      <AdminLayout>
        <div className="bg-primary-dark w-full">
          <div className="w-[842px] mx-auto">
            <Editor
              initialValue={blog}
              btnTitle="Update"
              busy={loading}
              onSubmit={submitHandler}
            />
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

type ReturnType = { blog: Blog };

// Build the pages with this data (service)
export const getServerSideProps: GetServerSideProps<
  ReturnType
> = async context => {
  const slug = context.params!.slug as string;
  const blog = await getBlog(slug);

  return {
    props: { blog: blog! },
    notFound: !blog,
  };
};

export default Update;
