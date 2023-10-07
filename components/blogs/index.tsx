import { FC } from 'react';
import { Blog } from '@/common-types/blog';
import { Blog as BlogComponent } from './blog';
import styles from './blogs.module.scss';

const Blogs: FC<{ blogs: Blog[]; forAdmin?: boolean }> = ({
  blogs,
  forAdmin,
}) => {
  return (
    <div className={styles.grid}>
      {blogs.map(blog => (
        <BlogComponent forAdmin={!!forAdmin} key={blog.slug} blog={blog} />
      ))}
    </div>
  );
};

export { Blogs };
