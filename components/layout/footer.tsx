import { FC, ReactElement } from 'react';
import styles from './footer.module.scss';
import Logo from './logo';
import Link from 'next/link';
import SocialMediaIcons from '../common/social-media-icons';

const Footer: FC = (): ReactElement => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__content}>
          <div className={styles.footer__left}>
            <Logo type="secondary" />
          </div>
          <div className={styles.footer__right}>
            <SocialMediaIcons fillColor="dark" />

            <div className="u-margin-bottom-medium" />

            <div className={styles.footer__contact}>
              <p className="paragraph paragraph--footer">
                <span className="paragraph--footer__bold">Email:</span>{' '}
                hammadkakli@gmail.com
              </p>
              <p className="paragraph paragraph--footer u-margin-bottom-medium">
                <span className="paragraph--footer__bold">Phone:</span> (+92)
                300 8089934
              </p>
            </div>

            <Link className="btn btn--primary" href="/contact">
              Contact Me <span className="btn__arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
