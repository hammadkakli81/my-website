import { FC, ReactElement } from 'react';
import { Training } from '../../common-types/training';
import TrainingGrid from '../common/training-grid';
import styles from './all-trainings.module.scss';

interface TrainingsComponentProps {
  trainings: Training[];
}

const TrainingsComponent: FC<TrainingsComponentProps> = ({
  trainings,
}): ReactElement => {
  return (
    <div className={styles.trainings}>
      <div className="container">
        <div className={styles.trainings__content}>
          <h2 className="heading-secondary heading-secondary__underline u-margin-bottom-medium">
            Trainings
          </h2>

          <TrainingGrid trainings={trainings} background={'light'} />
        </div>
      </div>
    </div>
  );
};

export default TrainingsComponent;
