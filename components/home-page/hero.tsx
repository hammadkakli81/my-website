import Link from 'next/link';
import styles from './hero.module.scss';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.hero__content}>
          <div className={styles.hero__content_left}>
            <h1 className="heading-primary u-margin-bottom-small">
              Hi, I am Hammad Kakli, an Amazon Enthusiast.
            </h1>

            <p
              className={
                styles.hero__paragraph + ' paragraph' + ' u-margin-bottom-small'
              }
            >
              Amazon Account Manager || PPC Expert || PL Wholesale Dropshipping
              Expert || Amazon Evangelist Consultant and Trainer.
            </p>

            <p
              className={
                styles.hero__paragraph +
                ' ' +
                'paragraph' +
                ' u-margin-bottom-medium'
              }
            >
              Experienced Professional Freelancer with a demonstrated history of
              working in the E-Commerce/internet industry.
            </p>

            <div className={styles.hero__buttons}>
              <Link href="/about" className="btn btn--primary">
                More About Me <span className="btn__arrow">&rarr;</span>
              </Link>
              <Link href="/contact" className="btn btn--secondary">
                Contact Me <span className="btn__arrow">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className={styles.hero__content_right}>
            <div className={styles.hero__image_container}>
              <div>
                <Image
                  src="/images/hammad.png"
                  alt="hammad"
                  height={394}
                  width={365}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
