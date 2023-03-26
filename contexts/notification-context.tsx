import { createContext, ReactNode, useState } from 'react';

// types
interface NotificationData {
  notificationText: string;
  type: 'success' | 'error' | null;
}
interface Notification extends NotificationData {
  showNotification: (notificationData: NotificationData) => void;
  hideNotification: () => void;
}

// context
const NotificationContext = createContext<Notification>({
  notificationText: '',
  type: null,
  showNotification: () => {},
  hideNotification: () => {},
});

// context-provider
interface Props {
  children: ReactNode;
}
export function NotificationContextProvider(props: Props) {
  // state is used if notificationData is changed, rerender the component
  // create the new context data, and provide that to original context provider
  const [activeNotification, setActiveNotification] =
    useState<NotificationData | null>(null);

  const showNotificationHandler = (data: NotificationData) => {
    setActiveNotification(data);
  };
  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notificationText: activeNotification
      ? activeNotification.notificationText
      : '',
    type: activeNotification ? activeNotification.type : null,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
