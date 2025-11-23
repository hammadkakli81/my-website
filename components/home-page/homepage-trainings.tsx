import { FC } from 'react';
import TrainingGrid from '../common/training-grid';
import styles from './homepage-trainings.module.scss';
import { Training } from '../../common-types/training';
import { motion } from 'framer-motion';

const HomePageTrainings: FC<{ trainings: Training[] }> = ({ trainings }) => {
  return (
    <div className={styles.homepage_trainings}>
      <div className="container">
        <motion.div
          className={styles.homepage_trainings__content}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-secondary heading-secondary__underline u-margin-bottom-medium">
            Trainings
          </h2>

          <TrainingGrid trainings={trainings} background={'light'} />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePageTrainings;
