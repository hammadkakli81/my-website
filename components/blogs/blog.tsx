import { Blog } from '@/common-types/blog';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import DeleteConfirmModal from '../admin/trainings/delete-confirm-modal';

const Blog: FC<{ blog: Blog; forAdmin?: boolean }> = ({ blog, forAdmin }) => {
  const router = useRouter();
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  return (
    <div
      className="max-w-[400px] bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/15"
      key={blog.slug}
    >
      {blog.thumbnail && blog.thumbnail.src && (
        <div className="h-[150px] overflow-hidden">
          <Image
            alt="Blog Image"
            src={blog.thumbnail?.src!}
            width={500}
            height={300}
            className="h-auto w-full"
          />
        </div>
      )}

      <div className="py-4 px-8 md:px-10 lg:px-14 mt-5 flex flex-col justify-between min-h-[230px]">
        <div>
          <Link href={`/blogs/${blog.slug}`}>
            <p className="font-bold text-2xl hover:underline transition">
              {blog.title.length >= 60
                ? blog.title.substring(0, 60)
                : blog.title}
            </p>
          </Link>
          <p className="mt-3 text-xl">{blog.meta}</p>
        </div>

        <div className="mt-4 w-full flex justify-center">
          {forAdmin ? (
            <div className="flex items-center justify-center space-x-2">
              <Link
                href={`/admin/blogs/${blog.slug}`}
                className="btn btn--tertiary text-2xl mt-5 mb-10 text-white inline-block"
              >
                Edit
              </Link>
              <button
                onClick={() => setShowDeleteConfirmModal(true)}
                className="btn btn-logout text-2xl mt-5 mb-10 text-white inline-block"
              >
                Delete
              </button>
            </div>
          ) : (
            <Link
              href={`/blogs/${blog.slug}`}
              className="btn btn--tertiary text-2xl mt-5 mb-10 text-white inline-block"
            >
              Read
            </Link>
          )}
        </div>
      </div>
      {showDeleteConfirmModal && (
        <DeleteConfirmModal
          onClose={() => setShowDeleteConfirmModal(false)}
          onDelete={() => {
            setShowDeleteConfirmModal(false);
            router.push(router.pathname);
          }}
          blog={blog}
        />
      )}
    </div>
  );
};

export { Blog };
