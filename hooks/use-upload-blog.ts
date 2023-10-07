import { useMutation } from './use-mutation';
import { useContext, useEffect } from 'react';
import NotificationContext from '@/contexts/notification-context';

function useUploadBlog() {
  const notification = useContext(NotificationContext);

  const { data, mutateData, mutating, error } = useMutation<{
    message: string;
  } | null>({
    defaultValue: null,
    method: 'post',
    url: '/api/admin/blogs',
  });

  useEffect(() => {
    if (data) {
      notification.hideNotification();
      notification.showNotification({
        type: 'success',
        notificationText: data.message || 'Success',
      });
    }

    if (error) {
      notification.hideNotification();
      notification.showNotification({
        type: 'error',
        notificationText: error || 'Error',
      });
    }
  }, [data, error]);

  const createBlog = (post: FormData) => {
    return mutateData(post);
  };

  return { createBlog, uploading: mutating };
}

export { useUploadBlog };
