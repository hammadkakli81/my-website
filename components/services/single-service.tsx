import { FC, ReactElement } from 'react';
import { Service } from '../../common-types/service';
import styles from './single-service.module.scss';

interface SingleServiceProps {
  service: Service;
}

const SingleService: FC<SingleServiceProps> = (props): ReactElement => {
  return (
    <div className={styles.single_service}>
      <div className="container">
        <div className={styles.single_service__content}>
          <h2 className="heading-secondary heading-secondary__underline u-margin-bottom-medium">
            {props.service.name}
          </h2>

          <p className="paragraph">{props.service.name}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleService;
