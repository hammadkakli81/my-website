import { useEffect } from 'react';
import { Editor } from '@/components/admin/editor';
import AdminLayout from '@/components/admin/admin-layout';
import { useUploadBlog } from '@/hooks/use-upload-blog';
import Head from 'next/head';

function Create() {
  const { createBlog, uploading } = useUploadBlog();

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

  const submitHandler = (post: FormData) => {
    createBlog(post);
  };

  return (
    <>
      <Head>
        <title>Create Blog | Hammad</title>
      </Head>
      <AdminLayout>
        <div className="bg-primary-dark w-full">
          <div className="w-[842px] mx-auto">
            <Editor
              btnTitle="Submit"
              busy={uploading}
              onSubmit={submitHandler}
            />
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default Create;
