import AdminLayout from '@/components/admin/admin-layout';
import { ActionButton } from '@/components/admin/ui/action-button';
import NotificationContext from '@/contexts/notification-context';
import { useMutation2 } from '@/hooks/use-mutation';
import { IUser } from '@/models/comment';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useContext, useState } from 'react';

function capitalize(str: string) {
  return str
    .split(' ')
    .map(strItem => strItem[0].toUpperCase() + strItem.slice(1))
    .join(' ');
}

function Me({ user }: { user: IUser }) {
  const [bio, setBio] = useState(user ? user.bio : '');

  const { updateUser, mutating } = useUpdateUser();

  if (!user) return null;

  return (
    <AdminLayout>
      <div className="min-h-screen bg-primary-dark">
        <Head>
          <title>{user ? capitalize(user.name) : 'Me'} | Hammad</title>
        </Head>
        <div className="pt-20 pb-5 w-full flex items-center justify-center">
          <h2 className="w-[400px] translate-x-16 text-4xl font-semibold text-primary-dark p-2 bg-secondary-light rounded">
            Note: Only Bio Can be updated. If you want to update further
            properties, update it from your Google Account.
          </h2>
        </div>
        <div className="text-4xl text-primary w-full flex items-center justify-center h-[500px]">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <label htmlFor="email">Email:</label>
              <div
                id="email"
                className="w-[400px] p-4 outline-none border-transparent border-2 bg-secondary-dark transition focus:border-secondary-light rounded-lg"
              >
                {user.email}
              </div>
            </div>
            <div className="flex items-center justify-between space-x-2">
              <label htmlFor="name">Name:</label>
              <div
                id="name"
                className="w-[400px] p-4 outline-none border-transparent border-2 bg-secondary-dark transition focus:border-secondary-light rounded-lg"
              >
                {user.name}
              </div>
            </div>

            <div className="flex items-start justify-between space-x-2">
              <label className="mt-4" htmlFor="bio">
                Bio:
              </label>
              <textarea
                id="bio"
                value={bio}
                defaultValue={user.bio ?? ''}
                onChange={e => setBio(e.target.value)}
                className="min-h-[300px] w-[400px] p-4 outline-none border-transparent border-2 bg-secondary-dark transition focus:border-secondary-light rounded-lg"
              >
                {user.bio}
              </textarea>
            </div>

            <div className="self-end">
              <ActionButton
                busy={mutating}
                disabled={mutating}
                onClick={() => updateUser({ bio })}
                title="Update User"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const user = session?.user;

  return {
    props: { user },
  };
};

export default Me;

function useUpdateUser() {
  const { hideNotification, showNotification } =
    useContext(NotificationContext);

  const { mutateData, mutating } = useMutation2({
    defaultValue: null as null | IUser,
    method: 'patch',
    url: '/api/admin/me',
    onMutate: () =>
      showNotification({
        type: 'success',
        notificationText: 'Successfully updated user',
      }),
  });

  const updateUser = (body: any) => {
    hideNotification();
    mutateData(body);
  };

  return { updateUser, mutating };
}
