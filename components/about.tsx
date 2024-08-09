import Image from 'next/image';
import { FC } from 'react';
import styles from './about.module.scss';

const About: FC = () => {
  return (
    <div className={styles.about}>
      <div
        className={styles.about__image_container + ' u-margin-bottom-medium'}
      >
        <Image
          src="/images/hammad-full.jpg"
          width={853}
          height={468}
          alt="Hammad"
        />
      </div>

      <div className="container-small">
        <h2 className="heading-secondary heading-secondary__underline u-margin-bottom-medium">
          More about me
        </h2>

        <p className="paragraph paragraph--clear u-margin-bottom-small">
          Experienced Professional Freelancer with a demonstrated history of
          working in the E-Commerce/internet industry.
        </p>

        <p className="paragraph paragraph--clear u-margin-bottom-small">
          I am an Analyst, programmer, troublemaker, executive, revisionist,
          sales guy, data analyst, system administrator, product owner,
          evangelist and biker. And I probably forgot a few.
        </p>

        <p className="paragraph paragraph--clear u-margin-bottom-small">
          I am interested to scale the business as well as technology. I am
          proud to be involved in the Amazon business to enable young businesses
          around the globe.
        </p>

        <p className="paragraph paragraph--clear u-margin-bottom-small">
          I am enjoying to enable Pakistan in the field of eCommerce. Skilled in
          Amazon MWS, Amazon PPC, Amazon Listing, All Bulk Operations, Customer
          Support, A+ Content, Amazon Private Label, Wholesale FBA and
          Drop-shipping, with a Bachelor of Science (BS) focused in Computer
          Science from University of Central Punjab.
        </p>
      </div>
    </div>
  );
};

export default About;
