import { FC, Fragment, ReactElement, ReactNode } from 'react';
import MainNavigation from './main-navigation';
import Footer from './footer';
import NotificationComponent from '../common/notification';
import BackgroundScene from '../3d/BackgroundScene';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = (props): ReactElement => {
  // props.children is every page component that will be render through this
  return (
    <Fragment>
      <BackgroundScene />
      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
      <NotificationComponent />
    </Fragment>
  );
};

export default Layout;
