import Link from 'next/link';
import { type FC } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Training } from '../../../common-types/training';
import styles from './update-trainings.module.scss';

const UpdateTrainings: FC<{ trainings: Training[] }> = ({ trainings }) => {
  return (
    <div className={styles.trainings}>
      <div className={styles.content}>
        <h1>Update Trainings</h1>

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

export default UpdateTrainings;
