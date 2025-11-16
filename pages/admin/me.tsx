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
      <div className="min-h-screen w-full p-10 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-sky-500/5 to-yellow-500/5"></div>
        <Head>
          <title>{user ? capitalize(user.name) : 'Me'} | Hammad</title>
        </Head>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl border border-blue-200/30 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 p-4 bg-blue-50/70 rounded-xl border border-blue-200/30">
              Note: Only Bio Can be updated. If you want to update further
              properties, update it from your Google Account.
            </h2>
          </div>
          <div className="bg-white/70 backdrop-blur-xl border border-blue-200/30 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <label htmlFor="email" className="text-lg font-semibold text-gray-800 min-w-[120px]">Email:</label>
                <div
                  id="email"
                  className="flex-1 max-w-[400px] p-4 outline-none border border-blue-200/30 bg-white/80 backdrop-blur-sm rounded-xl text-gray-800 transition focus:border-blue-400"
                >
                  {user.email}
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <label htmlFor="name" className="text-lg font-semibold text-gray-800 min-w-[120px]">Name:</label>
                <div
                  id="name"
                  className="flex-1 max-w-[400px] p-4 outline-none border border-blue-200/30 bg-white/80 backdrop-blur-sm rounded-xl text-gray-800 transition focus:border-blue-400"
                >
                  {user.name}
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <label className="text-lg font-semibold text-gray-800 min-w-[120px] mt-2" htmlFor="bio">
                  Bio:
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  defaultValue={user.bio ?? ''}
                  onChange={e => setBio(e.target.value)}
                  className="flex-1 max-w-[400px] min-h-[300px] p-4 outline-none border border-blue-200/30 bg-white/80 backdrop-blur-sm rounded-xl text-gray-800 transition focus:border-blue-400 focus:bg-white resize-y"
                >
                  {user.bio}
                </textarea>
              </div>

              <div className="self-end mt-4">
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
