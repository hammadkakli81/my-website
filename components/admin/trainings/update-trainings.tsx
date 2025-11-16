import Link from 'next/link';
import { useState, type FC } from 'react';
import { useRouter } from 'next/router';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Training } from '../../../common-types/training';
import CreateNewTraining from './create-new-training';
import styles from './update-trainings.module.scss';
import { AiOutlineDelete } from 'react-icons/ai';
import DeleteConfirmModal from './delete-confirm-modal';

const UpdateTrainings: FC<{ trainings: Training[] }> = ({ trainings }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModalWithTraining, setShowDeleteModalWithTraining] =
    useState(null as null | Training);
  const router = useRouter();

  return (
    <div className={styles.trainings}>
      <div className={styles.content}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <h1>Update Trainings</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn--primary"
          >
            Create new Training
          </button>
        </div>

        {trainings.map(training => {
          return (
            <div
              key={training._id}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Link
                href={`/admin/trainings/${training.slug}`}
                key={training.slug}
                className={styles.training_card}
              >
                <div>{training.name}</div>
                <FaLongArrowAltRight style={{ marginLeft: '1.5rem' }} />
              </Link>
              <DeleteBtn
                onClick={() => setShowDeleteModalWithTraining(training)}
                notTranslate
              />
            </div>
          );
        })}
      </div>
      <CreateNewTraining
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={() => {
          setShowCreateModal(false);
          router.push(router.pathname);
        }}
      />
      <DeleteConfirmModal
        training={showDeleteModalWithTraining!}
        onClose={() => setShowDeleteModalWithTraining(null)}
        onDelete={() => {
          setShowDeleteModalWithTraining(null);
          router.push(router.pathname);
        }}
      />
    </div>
  );
};

function DeleteBtn({
  onClick,
  notTranslate = false,
}: {
  onClick: () => void;
  notTranslate?: boolean;
}) {
  const onClickHandler = (e: any) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      onClick={onClickHandler}
      className={
        styles.deleteBtn + ` ${!notTranslate ? styles.deleteBtnTranslate : ''}`
      }
    >
      <AiOutlineDelete className={styles.deleteBtnIcon} size={18} />
    </div>
  );
}

export default UpdateTrainings;
