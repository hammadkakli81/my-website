import classNames from 'classnames';
import { signIn } from 'next-auth/react';
import { useCallback, type FC } from 'react';
import { AiFillGoogleSquare } from 'react-icons/ai';

type Props = { lightOnly?: boolean; big?: boolean };

const GoogleAuthButton: FC<Props> = ({ lightOnly, big }) => {
  const getColors = useCallback(() => {
    return lightOnly
      ? 'text-primary-dark bg-primary'
      : 'bg-primary-dark text-primary dark:bg-primary dark:text-primary-dark';
  }, [lightOnly]);

  return (
    <button
      className={classNames(
        'flex items-center justify-center space-x-1 rounded transition duration-100 hover:scale-[0.97]',
        getColors(),
        `${big ? 'text-4xl py-5 px-10' : 'px-3 py-2'}`
      )}
      onClick={() => signIn('google')}
    >
      <div className="inline-block">Continue With</div>
      <AiFillGoogleSquare size={big ? 50 : 24} />
    </button>
  );
};

export { GoogleAuthButton };
