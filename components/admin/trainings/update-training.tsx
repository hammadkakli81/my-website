import Link from 'next/link';
import { type FC } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Training } from '../../../common-types/training';
import styles from './update-trainings.module.scss';

const UpdateTraining: FC<{ trainings: Training[]; training: Training }> = ({
  trainings,
  training,
}) => {
  const trainingIndex = trainings.findIndex(t => t.slug === training.slug);

  return (
    <div className={styles.trainings}>
      <div className={styles.content}>
        <h1>Update: {training.name}</h1>

        {trainings.map(training => {
          return (
            <Link
              href={`/admin/trainings/${training.slug}`}
              key={training.slug}
            >
              <div className={styles.training_card}>
                <div>{training.name}</div>
                <FaLongArrowAltRight />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default UpdateTraining;
