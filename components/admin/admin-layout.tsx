import {
  FC,
  Fragment,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';
import NotificationComponent from '../common/notification';
import MainNavigation from '../layout/main-navigation';
import Sidebar from './sidebar';
import { useSession } from 'next-auth/react';
import Unauthorized from './unauthorized';
import styles from './admin-layout.module.scss';

interface Props {
  children?: ReactNode;
}

const Wrapped: FC<PropsWithChildren> = props => (
  <div className={styles.wrapped}>{props.children}</div>
);

const AdminLayout: FC<Props> = (props): ReactElement => {
  const session = useSession();

  let content: JSX.Element | null = null;
  if (session.status === 'loading') {
    content = <Wrapped />;
  } else if (session.status === 'unauthenticated') {
    content = (
      <Wrapped>
        <Unauthorized />
      </Wrapped>
    );
  } else if (session.status === 'authenticated') {
    content = props.children as JSX.Element;
  }

  return (
    <Fragment>
      <MainNavigation />
      <main style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>{content}</div>
      </main>
      <NotificationComponent />
    </Fragment>
  );
};

export default AdminLayout;
