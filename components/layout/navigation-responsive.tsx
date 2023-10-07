import { FC } from 'react';
import SocialMediaIcons from '../common/social-media-icons';
import NavLink from './nav-link';
import styles from './navigation-responsive.module.scss';
import { NavLinkInterface } from './main-navigation';

interface NavigationResponsiveProps {
  navLinks: NavLinkInterface[];
  isResponsiveBtnActive: boolean;
  setIsResponsiveBtnActive(isResponsive: boolean): void;
}

const NavigationResponsive: FC<NavigationResponsiveProps> = ({
  navLinks,
  isResponsiveBtnActive,
  setIsResponsiveBtnActive,
}) => {
  return (
    <div
      className={`${styles.full_screen} ${
        isResponsiveBtnActive ? styles.full_screen__active : ''
      }`}
      onClick={e => setIsResponsiveBtnActive(false)}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`${styles.nav_res} ${
          isResponsiveBtnActive ? styles.nav_res__active : ''
        }`}
      >
        <nav className={styles.nav_res__navigation}>
          <ul className={styles.nav_res__nav_list + ' u-margin-right-medium'}>
            {navLinks.map(link => (
              <NavLink
                className="u-margin-bottom-small"
                key={link.href}
                {...link}
              />
            ))}
          </ul>
          <SocialMediaIcons
            className={styles.nav_res__social_media_icons}
            fillColor="light"
          />
        </nav>
      </div>
    </div>
  );
};

export default NavigationResponsive;
