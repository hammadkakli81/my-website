import Link from 'next/link';
import { FC } from 'react';
import styles from './sidebar.module.scss';

const links = [
  { href: '/admin/dashboard', text: 'Dashboard' },
  { href: '/admin/trainings', text: 'Trainings' },
  { href: '/admin/services', text: 'Services' },
];

const Sidebar: FC = () => {
  return (
    <div className={styles.sidebar}>
      {links.map(link => {
        return (
          <Link key={link.href} href={link.href}>
            <div className={styles.sidebar_link}>{link.text}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
