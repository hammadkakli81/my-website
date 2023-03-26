import { FC } from 'react';
import styles from './all-services.module.scss';
import ServiceGrid from '../common/service-grid';
import { Service } from '../../common-types/service';

const AllServices: FC<{ services: Service[] }> = ({ services }) => {
  return (
    <div className={styles.all_services}>
      <div className="container">
        <h2 className="heading-secondary heading-secondary__underline u-margin-bottom-medium">
          All Services
        </h2>

        <ServiceGrid services={services} background="light" />
      </div>
    </div>
  );
};

export default AllServices;
