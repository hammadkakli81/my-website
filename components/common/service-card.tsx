import Link from 'next/link';
import { FC, ReactElement } from 'react';
import styles from './service-card.module.scss';
import type { Service } from '../../common-types/service';

interface ServiceCardProps extends Service {
  background: 'light' | 'dark';
}

const ServiceCard: FC<ServiceCardProps> = (props): ReactElement => {
  return (
    <Link
      href={`/services/${props.slug.toLowerCase()}`}
      className={styles.card}
    >
      <div className={styles.card_back}>
        <div className={styles.card_back__text_container}>
          <div className="heading-tertiary heading-tertiary-white">
            More Info
          </div>
        </div>
      </div>

      <div
        className={`${styles.card_front} ${
          props.background === 'dark'
            ? styles.card_front__dark
            : styles.card_front__light
        }`}
      >
        <div className={styles.card_front__heading_container}>
          <h3 className="heading-tertiary">{props.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
