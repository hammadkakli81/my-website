import Link from 'next/link';
import { FC } from 'react';
import styles from './dashboard.module.scss';

const Dashboard: FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.content}>
        <h1>Admin Dashboard.</h1>
        <p>Update website&apos;s resources: Trainings and Services.</p>
        <div className={styles.buttons}>
          <Link href="/admin/trainings">
            <button className="btn btn--primary">Update Trainings</button>
          </Link>

          <Link href="/admin/services">
            <button className="btn btn--primary">Update Services</button>
          </Link>

          <Link href="/admin/blogs">
            <button className="btn btn--primary">Update Blogs</button>
          </Link>

          <Link href="/admin/me">
            <button className="btn btn--primary">Update Me</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
