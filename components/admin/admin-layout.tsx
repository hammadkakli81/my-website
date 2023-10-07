import { FC, Fragment, PropsWithChildren, ReactNode } from 'react';
import NextNProgress from 'nextjs-progressbar';

import NotificationComponent from '../common/notification';
import MainNavigation from '../layout/main-navigation';
import Sidebar from './sidebar';
import { useSession } from 'next-auth/react';
import Unauthorized from './unauthorized';
import styles from './admin-layout.module.scss';

const Wrapped: FC<PropsWithChildren> = props => (
  <div className={styles.wrapped}>{props.children}</div>
);

const AdminLayout: FC<PropsWithChildren> = props => {
  const session = useSession();
  const user = session.data?.user;

  let content: JSX.Element | null = null;
  if (session.status === 'loading') {
    content = <Wrapped />;
  } else if (session.status === 'unauthenticated' || user?.role !== 'admin') {
    content = (
      <Wrapped>
        <Unauthorized />
      </Wrapped>
    );
  } else if (session.status === 'authenticated' && user.role === 'admin') {
    content = <Scrollable>{props.children}</Scrollable>;
  }

  return (
    <Fragment>
      <NextNProgress
        height={3}
        color="#3acbf0"
        options={{ showSpinner: false }}
      />
      <MainNavigation />
      <main style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>{content}</div>
      </main>
      <NotificationComponent />
    </Fragment>
  );
};

function Scrollable({ children }: PropsWithChildren) {
  return <div className={styles.scrollable}>{children}</div>;
}

export default AdminLayout;
