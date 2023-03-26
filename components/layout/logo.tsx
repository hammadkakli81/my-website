import { FC, ReactElement } from 'react';
import Link from 'next/link';
import styles from './logo.module.scss';

interface LogoProps {
  type: 'primary' | 'secondary';
}

const Logo: FC<LogoProps> = ({ type }): ReactElement => {
  const styleType =
    type === 'primary' ? styles.logo__primary : styles.logo__secondary;

  return (
    <Link href="/">
      <a className={`${styles.logo} ${styleType}`}>
        <div>Hammad Kakli</div>
      </a>
    </Link>
  );
};

export default Logo;
