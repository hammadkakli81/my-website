import axios from 'axios';
import Link from 'next/link';
import { type FC, useState, useContext } from 'react';
import { Service } from '../../../common-types/service';
import NotificationContext from '../../../contexts/notification-context';
import ServiceCard from './service-card';
import styles from './update.module.scss';

const UpdateServices: FC<{ services: Service[]; id: string }> = ({
  services,
  id,
}) => {
  const notificationContext = useContext(NotificationContext);

  const [servicesToUpdate, setServicesToUpdate] = useState(services);
  const [loading, setLoading] = useState(false);

  const servicesSaveHandler = async () => {
    notificationContext.hideNotification();
    setLoading(true);

    try {
      const { data } = await axios.patch('/api/admin/services', {
        id,
        services: servicesToUpdate,
      });

      setLoading(false);
      notificationContext.showNotification({
        notificationText: data.message || 'Updated',
        type: 'success',
      });
    } catch (err: any) {
      setLoading(false);

      const msg = err.response.data.message || 'Something went wrong';
      notificationContext.showNotification({
        notificationText: msg,
        type: 'error',
      });
    }
  };

  return (
    <div className={styles.services}>
      <div className={styles.content}>
        <h1>Update Services</h1>

        {servicesToUpdate.map((service, i) => {
          return (
            <ServiceCard
              key={service.slug}
              service={service}
              index={i}
              updateServices={setServicesToUpdate}
            />
          );
        })}

        <div className={styles.actions_container}>
          <div />

          <div className={styles.actions}>
            <button
              onClick={servicesSaveHandler}
              className={'btn-admin' + ` ${styles.save}`}
            >
              {loading ? <div className="loader" /> : 'Save'}
            </button>

            <Link href="/admin/dashboard">
              <button className={styles.cancel}>Cancel</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateServices;
