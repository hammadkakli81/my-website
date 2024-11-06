import { FC, useEffect, useState } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { Training } from '../../common-types/training';
import styles from './single-training.module.scss';

interface Props {
  training: Training | null;
}

const SingleTraining: FC<Props> = ({ training }) => {
  const [mainDescriptions] = useState<string[]>(() =>
    training ? training.description.map(descPoint => descPoint.name) : []
  );
  const [furtherDescriptions] = useState<{
    [key: number]: string[];
  }>(() => {
    const temp = {} as { [key: number]: string[] };
    training?.description.forEach((descPoint, i) => {
      temp[i] = descPoint.furtherDesc;
    });
    return temp;
  });

  const [whichBlockActive, setWhichBlockActive] = useState<{
    [key: number]: boolean;
  }>({});

  if (!training) return null;

  return (
    <div className={styles.single_training}>
      <h2 className={styles.single_training__heading}>{training.name}</h2>

      <h3 className="heading-tertiary u-margin-top-small">
        What you will learn in this course
      </h3>

      <div className={styles.single_training__content}>
        <button
          className={styles.section_btn}
          onClick={() => {
            mainDescriptions.forEach((_, i) => {
              if (furtherDescriptions[i].length >= 1) {
                setWhichBlockActive(prevState => ({
                  ...prevState,
                  [i]: true,
                }));
              }
            });
          }}
        >
          <h3 className="paragraph paragraph--card">Expand all sections</h3>
        </button>

        <button
          className={styles.section_btn + ' ' + styles.section_close}
          onClick={() => {
            mainDescriptions.forEach((_, i) =>
              setWhichBlockActive(prevState => ({ ...prevState, [i]: false }))
            );
          }}
        >
          <h3 className="paragraph paragraph--card">Close all sections</h3>
        </button>

        {mainDescriptions.map((desc, i) => {
          return (
            <div key={i}>
              <div className={styles.single_training__main_desc}>
                <h2 className="paragraph paragraph--white">
                  {i + 1 + ': ' + desc}
                </h2>

                {furtherDescriptions[i].length >= 1 ? (
                  <IoIosArrowDropdownCircle
                    onClick={() => {
                      setWhichBlockActive(prevState => ({
                        ...prevState,
                        [i]: !prevState[i],
                      }));
                    }}
                    className={`${styles.single_training__main_desc_btn} ${
                      whichBlockActive[i] &&
                      styles.single_training__main_desc_btn__active
                    }`}
                  />
                ) : (
                  // just for styling, add the div with same styling with the button
                  <div
                    className={`${styles.single_training__main_desc_btn} ${styles.single_training__main_desc_btn__no_hover}`}
                  ></div>
                )}
              </div>

              {whichBlockActive[i] && (
                <div className={styles.single_training__further_desc_container}>
                  {furtherDescriptions[i] &&
                    furtherDescriptions[i].map((furtherDesc, i) => (
                      <div key={i}>
                        <h3>{i + 1 + ': ' + furtherDesc}</h3>
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleTraining;
