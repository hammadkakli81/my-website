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
        <div className="w-full min-h-screen p-10 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-sky-500/5 to-yellow-500/5"></div>
          <div className="relative z-10">
            <div className="w-full max-w-[842px] mx-auto bg-white/70 backdrop-blur-xl border border-blue-200/30 rounded-3xl p-8 shadow-2xl">
              <Editor
                btnTitle="Submit"
                busy={uploading}
                onSubmit={submitHandler}
              />
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default Create;
