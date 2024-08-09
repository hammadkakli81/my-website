import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { CSSProperties, FC, FormEvent, useContext, useState } from 'react';
import styles from './signin.module.scss';

import NotificationContext from '../../contexts/notification-context';

type Event = FormEvent<HTMLFormElement>;

const Signin: FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);

  const formSubmitHandler = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    notificationCtx.hideNotification();

    const status = await signIn('credentials', {
      redirect: false,
      callbackUrl: '/admin/dashboard',
      email,
      password,
    });
    setLoading(false);

    if (status && !status.ok) {
      notificationCtx.showNotification({
        notificationText: status.error || 'Something went wrong',
        type: 'error',
      });
    }

    if (status && status.ok && status.url) {
      notificationCtx.showNotification({
        notificationText: 'You are logged in as Admin',
        type: 'success',
      });
      router.push(status.url);
    }
  };

  return (
    <div className={styles.signin}>
      <div className={styles.box}>
        <h1 className="heading-secondary heading-secondary--white">
          Signin as Admin
        </h1>

        <form onSubmit={formSubmitHandler}>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className={styles.input}
            type="email"
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.input}
            type="password"
          />

          <button
            className="btn-admin u-margin-top-small"
            disabled={loading}
            type="submit"
          >
            {loading ? <div className="loader" /> : 'Signin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
