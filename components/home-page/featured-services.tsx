import { FC, ReactElement } from 'react';
import styles from './featured-services.module.scss';
import { motion } from 'framer-motion';

import ServiceGrid from '../common/service-grid';
import { Service } from '../../common-types/service';

const FeaturedServices: FC<{ services: Service[] }> = ({
  services,
}): ReactElement => {
  return (
    <section className={styles.featured_services}>
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="heading-secondary heading-secondary__underline u-margin-bottom-medium">
          Services
        </h2>
        <ServiceGrid services={services} background="light" />
        <div className="u-margin-bottom-medium" />
      </motion.div>
    </section>
  );
};

export default FeaturedServices;
