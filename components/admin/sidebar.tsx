import Link from 'next/link';
import { FC } from 'react';
import styles from './sidebar.module.scss';

const links = [
  { href: '/admin/dashboard', text: 'Dashboard' },
  { href: '/admin/trainings', text: 'Trainings' },
  { href: '/admin/services', text: 'Services' },
  { href: '/admin/blogs', text: 'Blogs' },
  { href: '/admin/me', text: 'Me' },
];

const Sidebar: FC = () => {
  return (
    <div className={styles.sidebar}>
      {links.map(link => {
        return (
          <Link
            key={link.href}
            href={link.href}
            className={styles.sidebar_link}
          >
            <div style={{ width: '90px' }}>{link.text}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
