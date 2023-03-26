import { FC } from 'react';
import TrainingGrid from '../common/training-grid';
import styles from './homepage-trainings.module.scss';
import { allTrainings } from '../../data/all-trainings';

const HomePageTrainings: FC = () => {
  return (
    <div className={styles.homepage_trainings}>
      <div className="container">
        <div className={styles.homepage_trainings__content}>
          <h2 className="heading-secondary heading-secondary__underline u-margin-bottom-medium">
            Trainings
          </h2>

          <TrainingGrid trainings={allTrainings} background={'light'} />
        </div>
      </div>
    </div>
  );
};

export default HomePageTrainings;
