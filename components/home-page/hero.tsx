import Link from 'next/link';
import styles from './hero.module.scss';
import Scene from '../3d/Scene';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className={styles.hero} style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className={styles.hero__content}>
          <div className={styles.hero__content_left}>
            <motion.h1
              className="heading-primary u-margin-bottom-small"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hi, I am Hammad Kakli, an Amazon Enthusiast.
            </motion.h1>

            <motion.p
              className={
                styles.hero__paragraph + ' paragraph' + ' u-margin-bottom-small'
              }
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Amazon Account Manager || PPC Expert || PL Wholesale Dropshipping
              Expert || Amazon Evangelist Consultant and Trainer.
            </motion.p>

            <motion.p
              className={
                styles.hero__paragraph +
                ' ' +
                'paragraph' +
                ' u-margin-bottom-medium'
              }
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experienced Professional Freelancer with a demonstrated history of
              working in the E-Commerce/internet industry.
            </motion.p>

            <motion.div
              className={styles.hero__buttons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/about" className="btn btn--primary">
                More About Me <span className="btn__arrow">&rarr;</span>
              </Link>
              <Link href="/contact" className="btn btn--secondary">
                Contact Me <span className="btn__arrow">&rarr;</span>
              </Link>
            </motion.div>
          </div>

          <div className={styles.hero__content_right} style={{ position: 'relative', minHeight: '400px' }}>
            <Scene />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
