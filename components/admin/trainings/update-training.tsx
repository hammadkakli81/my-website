import {
  useState,
  type FC,
  ChangeEventHandler,
  ChangeEvent,
  useContext,
} from 'react';
import slugify from 'slugify';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPlusSquareDotted } from 'react-icons/bs';
import { Training } from '../../../common-types/training';
import styles from './update-training.module.scss';
import TrainingPreview from './training-preview';
import axios from 'axios';
import NotificationContext from '../../../contexts/notification-context';

const DEFAULT_TEXT = 'Click here to update';
type Handle = ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

const UpdateTraining: FC<{ training: Training }> = ({ training }) => {
  const notificationContext = useContext(NotificationContext);
  const [trainingForUpdate, setTrainingForUpdate] = useState(training);
  const [showTrainingPreview, setShowTrainingPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [whichDescriptionActive, setWhichDescriptionActive] = useState<{
    [key: number]: boolean;
  }>({});

  const onSaveHandler = async (training: Training) => {
    notificationContext.hideNotification();
    setLoading(true);

    try {
      const { data } = await axios.patch('/api/admin/trainings', { training });

      setLoading(false);
      notificationContext.showNotification({
        notificationText: data.message || 'Updated',
        type: 'success',
      });
    } catch (err: any) {
      setLoading(false);

      const msg = err.response.data.message || 'Something went wrong.';
      notificationContext.showNotification({
        notificationText: msg,
        type: 'error',
      });
    }
  };

  const handleOnChange: Handle = e => {
    if (e.target.name === 'name') {
      // change the name and slug
      return setTrainingForUpdate(prev => ({
        ...prev,
        name: e.target.value,
        slug: slugify(e.target.value.toLowerCase()),
      }));
    }

    setTrainingForUpdate(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const descriptionUpdateHandler = (
    i: number,
    descriptionPoint: (typeof trainingForUpdate.description)[0]
  ) => {
    setTrainingForUpdate(prev => ({
      ...prev,
      description: [
        ...prev.description.slice(0, i),
        descriptionPoint,
        ...prev.description.slice(i + 1),
      ],
    }));

    setWhichDescriptionActive(prev => ({ ...prev, [i]: false }));
  };

  const descriptionDeleteHandler = (i: number) => {
    setTrainingForUpdate(prev => ({
      ...prev,
      description: [
        ...prev.description.slice(0, i),
        ...prev.description.slice(i + 1),
      ],
    }));
  };

  const onClickHandler = (i: number) => {
    setWhichDescriptionActive(prev => ({
      ...prev,
      [i]: !prev[i] ? true : false,
    }));
  };

  const addDescriptionPoint = () => {
    setTrainingForUpdate(prev => ({
      ...prev,
      description: [
        ...prev.description,
        { name: DEFAULT_TEXT, furtherDesc: [] },
      ],
    }));
  };

  return (
    <div className={styles.trainings}>
      <div className={styles.content}>
        <h1>Update: {training.name}</h1>

        <div>
          <h2>Update - Name:</h2>
          <input
            type="text"
            name="name"
            id="name"
            value={trainingForUpdate.name}
            onChange={handleOnChange}
            className={styles.mainInput}
          />
        </div>

        <div>
          <h2>Update - Excerpt Description:</h2>
          <textarea
            name="excerptDesc"
            id="excerptDesc"
            value={trainingForUpdate.excerptDesc}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <h2>Update - Description:</h2>
          {trainingForUpdate.description.map((descPoint, i) => (
            <div key={i}>
              <div
                onClick={() => onClickHandler(i)}
                className={`${styles.description_card} ${
                  whichDescriptionActive[i]
                    ? styles.description_card_active
                    : ''
                }`}
              >
                <>
                  {descPoint.name === DEFAULT_TEXT ? (
                    <div style={{ fontStyle: 'italic' }}>{descPoint.name}</div>
                  ) : (
                    descPoint.name
                  )}
                  <DeleteBtn
                    notTranslate
                    onClick={() => descriptionDeleteHandler(i)}
                  />
                </>
              </div>
              {whichDescriptionActive[i] && (
                <FurtherDesc
                  onSubmit={descriptionPoint =>
                    descriptionUpdateHandler(i, descriptionPoint)
                  }
                  furtherDesc={descPoint.furtherDesc}
                  name={descPoint.name}
                />
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            right: '270px',
            bottom: '18px',
            transform: 'translate(12px, 10px)',
          }}
        >
          <PlusIcon onClick={addDescriptionPoint} />
        </div>

        <div className={styles.actions}>
          <button
            onClick={() => setShowTrainingPreview(true)}
            className={styles.save}
          >
            Preview
          </button>
          <button className={styles.cancel}>Cancel</button>
        </div>
      </div>
      <TrainingPreview
        show={showTrainingPreview}
        training={trainingForUpdate}
        onClose={() => setShowTrainingPreview(false)}
        onSubmit={onSaveHandler}
        isLoading={loading}
      />
    </div>
  );
};

const FurtherDesc: FC<{
  furtherDesc: string[];
  name: string;
  onSubmit: (descriptionPoint: { name: string; furtherDesc: string[] }) => void;
}> = ({ furtherDesc, name, onSubmit }) => {
  const [inputValues, setInputValues] = useState([name].concat(furtherDesc));

  const submitHandler = () => {
    const descriptionPoint = {
      name: inputValues[0],
      furtherDesc: inputValues.slice(1),
    };

    onSubmit(descriptionPoint);
  };

  const onChangeHandler = (i: number, e: ChangeEvent<HTMLInputElement>) => {
    setInputValues(prev =>
      prev
        .slice(0, i)
        .concat([e.target.value])
        .concat(prev.slice(i + 1))
    );
  };

  const addInput = () => {
    setInputValues(prev => [...prev, '']);
  };

  const deleteHandler = (i: number) => {
    setInputValues(prev => prev.slice(0, i).concat(prev.slice(i + 1)));
  };

  return (
    <div className={styles.furtherDesc}>
      {inputValues.map((inputValue, i) => (
        <div key={i}>
          <input
            className={`${styles.furtherDescInput} ${
              i === 0 ? styles.mainFurtherDescInput : ''
            }`}
            value={inputValue === DEFAULT_TEXT ? '' : inputValue}
            onChange={e => onChangeHandler(i, e)}
          />
          {i !== 0 && <DeleteBtn onClick={() => deleteHandler(i)} />}
        </div>
      ))}

      <div className={styles.iconWrapper}>
        <PlusIcon onClick={addInput} />
      </div>
      <UpdateBtn onClick={submitHandler} />
    </div>
  );
};

function UpdateBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className={styles.updateBtn}>
      <p style={{ fontSize: '15px' }} className="paragraph paragraph--card">
        Update
      </p>
    </button>
  );
}

function DeleteBtn({
  onClick,
  notTranslate = false,
}: {
  onClick: () => void;
  notTranslate?: boolean;
}) {
  const onClickHandler = (e: any) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      onClick={onClickHandler}
      className={
        styles.deleteBtn + ` ${!notTranslate ? styles.deleteBtnTranslate : ''}`
      }
    >
      <AiOutlineDelete className={styles.deleteBtnIcon} size={18} />
    </div>
  );
}

function PlusIcon({ onClick }: { onClick: () => void }) {
  return (
    <div onClick={onClick} className={styles.plusIconContainer}>
      <BsPlusSquareDotted size={24} className={styles.plusIcon} />
    </div>
  );
}

export default UpdateTraining;
