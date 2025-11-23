import classNames from 'classnames';
import { signIn } from 'next-auth/react';
import { useCallback, type FC } from 'react';
import { FcGoogle } from 'react-icons/fc';

type Props = { lightOnly?: boolean; big?: boolean };

const GoogleAuthButton: FC<Props> = ({ lightOnly, big }) => {
  return (
    <button
      className={classNames(
        'group flex items-center justify-center space-x-3 rounded-full border border-gray-300 bg-white px-6 py-3 transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700',
        big ? 'w-full text-lg' : 'text-base'
      )}
      onClick={() => signIn('google')}
    >
      <FcGoogle size={big ? 28 : 24} />
      <span className="font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-white">
        Continue with Google
      </span>
    </button>
  );
};

export { GoogleAuthButton };
