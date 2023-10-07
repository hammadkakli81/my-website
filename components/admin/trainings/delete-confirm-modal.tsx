import ReactDOM from 'react-dom';
import axios from 'axios';
import { FC, useContext, useState } from 'react';
import styles from './delete-confirm-modal.module.scss';
import { Training } from '@/common-types/training';
import NotificationContext from '@/contexts/notification-context';
import { Blog } from '@/common-types/blog';

interface Props {
  training?: Training | null;
  blog?: Blog | null;
  onClose?: () => void;
  onDelete?: () => void;
}

const DeleteConfirmModal: FC<Props> = ({
  onClose,
  training,
  blog,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);
  const notificationContext = useContext(NotificationContext);

  const onDeleteHandler = async () => {
    notificationContext.hideNotification();
    setLoading(true);

    try {
      let url = '';
      if (training) {
        url = `/api/admin/trainings/${training?._id}`;
      } else if (blog) {
        url = `/api/admin/blogs/${blog?._id}`;
      }

      const { data } = await axios.delete(url);

      setLoading(false);
      notificationContext.showNotification({
        notificationText: data.message || 'Updated',
        type: 'success',
      });
      onDelete && onDelete();
    } catch (err: any) {
      setLoading(false);

      const msg = err.response.data.message || 'Something went wrong.';
      notificationContext.showNotification({
        notificationText: msg,
        type: 'error',
      });
    }
  };

  if (!training && !blog) {
    return null;
  }

  const JSX = (
    <div onClick={onClose} className={styles.background}>
      <div onClick={e => e.stopPropagation()} className={styles.content}>
        <h1 className="paragraph paragraph--white">
          Are you Sure you want to delete the &lsquo;
          {training ? training.name : blog!.title}&lsquo;?
        </h1>
        <div className={styles.actions}>
          <button
            disabled={loading}
            onClick={onDeleteHandler}
            className={styles.cancel}
          >
            <span>Delete</span> {loading && <div className="loader" />}
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(JSX, document.getElementById('modal')!);
};

export default DeleteConfirmModal;
