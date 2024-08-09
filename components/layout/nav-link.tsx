import Link from 'next/link';
import { FC, ReactElement } from 'react';
import type { NavLinkInterface } from './main-navigation';
import styles from './nav-link.module.scss';

interface NavLinkProps extends NavLinkInterface {
  className?: string;
}

const NavLink: FC<NavLinkProps> = ({ href, text, className }): ReactElement => {
  return (
    <li className={`${styles.nav_list_item} ${className}`}>
      <Link href={href}>{text}</Link>
    </li>
  );
};

export default NavLink;
