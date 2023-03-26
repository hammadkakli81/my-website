import { FC, useContext } from 'react';
import NotificationContext from '../../contexts/notification-context';
import styles from './notification.module.scss';

const NotificationComponent: FC = () => {
  // where context will be received, and from where context will be called, both components will be rerendered
  const notificationContext = useContext(NotificationContext);

  if (!notificationContext.notificationText) {
    // If there is no notification, this should be empty string
    return null;
  }

  const emoji = notificationContext.type === 'success' ? '🚀' : '';
  return (
    <div
      className={`${styles.notification} ${
        notificationContext.type === 'success'
          ? styles.notification__success
          : styles.notification__error
      }`}
    >
      <p className={styles.notification__text}>
        {emoji} {' ' + notificationContext.notificationText}{' '}
      </p>
      <span
        onClick={() => notificationContext.hideNotification()}
        className={styles.notification__cross}
      >
        X
      </span>
    </div>
  );
};

export default NotificationComponent;
