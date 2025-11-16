import { FC, ReactElement, useState } from 'react';
import SocialMediaIcons from '../common/social-media-icons';
import Logo from './logo';
import NavigationResponsive from './navigation-responsive';
import styles from './main-navigation.module.scss';
import NavLink from './nav-link';
import { signOut, useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';

export interface NavLinkInterface {
  href: string;
  text: string;
}

const defaultNavLinks: NavLinkInterface[] = [
  { href: '/about', text: 'About Me' },
  { href: '/trainings', text: 'Trainings' },
  { href: '/services', text: 'Services' },
  { href: '/contact', text: 'Contact Me' },
  { href: '/blogs', text: 'Blogs' },
  { href: '/cart', text: 'Cart' },
];

const MainNavigation: FC = (): ReactElement => {
  const [isResponsiveBtnActive, setIsResponsiveBtnActive] = useState(false);

  Router.events.on('routeChangeComplete', () =>
    setIsResponsiveBtnActive(false)
  );
  Router.events.on('routeChangeError', () => setIsResponsiveBtnActive(false));

  const router = useRouter();
  const session = useSession();

  // Determine nav links based on user role and current route
  let navLinks: NavLinkInterface[] = [...defaultNavLinks];
  let navLinksResp: NavLinkInterface[] = [...defaultNavLinks];

  if (
    session.status === 'authenticated' &&
    session.data?.user?.role === 'admin'
  ) {
    if (router.pathname.startsWith('/admin')) {
      navLinks = [{ href: '/admin/dashboard', text: 'Dashboard' }];
      navLinksResp = [
        { href: '/admin/dashboard', text: 'Dashboard' },
        ...defaultNavLinks,
      ];
    } else {
      navLinks = [
        { href: '/admin/dashboard', text: 'Dashboard' },
        ...defaultNavLinks.filter(link => link.href !== '/cart'),
      ];
      navLinksResp = [
        { href: '/admin/dashboard', text: 'Dashboard' },
        ...defaultNavLinks,
      ];
    }
  }

  return (
    <header className={styles.header}>
      <NavigationResponsive
        navLinks={navLinksResp}
        isResponsiveBtnActive={isResponsiveBtnActive}
        setIsResponsiveBtnActive={setIsResponsiveBtnActive}
      />

      <div className="container">
        <div className={styles.header__content}>
          <Logo type="primary" />

          <nav className={styles.header__navigation}>
            <ul className={styles.header__nav_list + ' u-margin-right-medium'}>
              {navLinks.map(link => (
                <NavLink key={link.href} {...link} />
              ))}
              {session.status === 'authenticated' && (
                <button
                  onClick={() => {
                    signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL });
                  }}
                  className="btn btn-logout"
                >
                  Logout
                </button>
              )}
            </ul>
            {router.pathname.startsWith('/admin') ? null : (
              <SocialMediaIcons fillColor="light" />
            )}
          </nav>

          <div
            onClick={() => setIsResponsiveBtnActive(prevValue => !prevValue)}
            className={styles.header__btn_container}
          >
            <div
              className={`${styles.header__btn_small_devices} ${
                isResponsiveBtnActive
                  ? styles.header__btn_small_devices__active
                  : ''
              }`}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
