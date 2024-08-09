import { FC } from 'react';
import TrainingGrid from '../common/training-grid';
import styles from './homepage-trainings.module.scss';
import { Training } from '../../common-types/training';

const HomePageTrainings: FC<{ trainings: Training[] }> = ({ trainings }) => {
  return (
    <div className={styles.homepage_trainings}>
      <div className="container">
        <div className={styles.homepage_trainings__content}>
          <h2 className="heading-secondary heading-secondary__underline u-margin-bottom-medium">
            Trainings
          </h2>

          <TrainingGrid trainings={trainings} background={'light'} />
        </div>
      </div>
    </div>
  );
};

export default HomePageTrainings;
