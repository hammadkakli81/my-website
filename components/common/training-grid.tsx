import { FC, ReactElement } from 'react';
import styles from './training-grid.module.scss';
import TrainingCard from './training-card';
import { Training } from '../../common-types/training';

interface TrainingGridProps {
  trainings: Training[];
  background: 'light' | 'dark';
}

const TrainingGrid: FC<TrainingGridProps> = ({
  trainings,
  background,
}): ReactElement => {
  return (
    <div className={styles.training_grid}>
      {trainings.map((training, i) => {
        return (
          <TrainingCard key={i} training={training} background={background} />
        );
      })}
    </div>
  );
};

export default TrainingGrid;
