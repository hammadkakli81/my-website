import ReactDOM from 'react-dom';
import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  useContext,
  useState,
} from 'react';
import styles from './create-new-training.module.scss';
import { Training } from '@/common-types/training';
import slugify from 'slugify';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPlusSquareDotted } from 'react-icons/bs';
import axios from 'axios';
import NotificationContext from '@/contexts/notification-context';

interface Props {
  show: boolean;
  onClose?: () => void;
  onCreate?: () => void;
}

const DEFAULT_TEXT = 'Click here to update';
type Handle = ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

const CreateNewTraining: FC<Props> = ({ show, onClose, onCreate }) => {
  const [training, setTraining] = useState<Omit<Training, '_id'>>({
    name: '',
    excerptDesc: '',
    slug: '',
    description: [],
  });
  const [whichDescriptionActive, setWhichDescriptionActive] = useState<{
    [key: number]: boolean;
  }>({});
  const [loading, setLoading] = useState(false);
  const notificationContext = useContext(NotificationContext);

  const onSaveHandler = async () => {
    notificationContext.hideNotification();
    setLoading(true);

    try {
      await axios.post('/api/admin/trainings', { training });

      setLoading(false);
      notificationContext.showNotification({
        notificationText: 'New Training Created',
        type: 'success',
      });
      onCreate && onCreate();
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
      return setTraining(prev => ({
        ...prev,
        name: e.target.value,
        slug: slugify(e.target.value.toLowerCase()),
      }));
    }

    setTraining(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const descriptionDeleteHandler = (i: number) => {
    setTraining(prev => ({
      ...prev,
      description: [
        ...prev.description.slice(0, i),
        ...prev.description.slice(i + 1),
      ],
    }));
  };

  const descriptionUpdateHandler = (
    i: number,
    descriptionPoint: (typeof training.description)[0]
  ) => {
    setTraining(prev => ({
      ...prev,
      description: [
        ...prev.description.slice(0, i),
        descriptionPoint,
        ...prev.description.slice(i + 1),
      ],
    }));

    setWhichDescriptionActive(prev => ({ ...prev, [i]: false }));
  };

  const addDescriptionPoint = () => {
    setTraining(prev => ({
      ...prev,
      description: [
        ...prev.description,
        { name: DEFAULT_TEXT, furtherDesc: [] },
      ],
    }));
  };

  const onDescriptionClickHandler = (i: number) => {
    setWhichDescriptionActive(prev => ({
      ...prev,
      [i]: !prev[i] ? true : false,
    }));
  };

  if (!show) return null;

  const JSX = (
    <div onClick={onClose} className={styles.background}>
      <div onClick={e => e.stopPropagation()} className={styles.training}>
        <div className={styles.content}>
          <h1>Create new Training</h1>

          <div>
            <h2>Set - Name:</h2>
            <input
              type="text"
              name="name"
              id="name"
              value={training.name}
              onChange={handleOnChange}
              className={styles.mainInput}
            />
          </div>

          <div>
            <h2>Set - Excerpt Description:</h2>
            <textarea
              name="excerptDesc"
              id="excerptDesc"
              value={training.excerptDesc}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <h2>Set - Description:</h2>
            {training.description.map((descPoint, i) => (
              <div key={i}>
                <div
                  onClick={() => onDescriptionClickHandler(i)}
                  className={`${styles.description_card} ${
                    whichDescriptionActive[i]
                      ? styles.description_card_active
                      : ''
                  }`}
                >
                  <>
                    {descPoint.name === DEFAULT_TEXT ? (
                      <div style={{ fontStyle: 'italic' }}>
                        {descPoint.name}
                      </div>
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
              right: '140px',
              bottom: '18px',
              transform: 'translate(12px, 10px)',
            }}
          >
            <PlusIcon onClick={addDescriptionPoint} />
          </div>

          <div className={styles.actions}>
            <button
              disabled={loading}
              onClick={onSaveHandler}
              className={styles.save}
            >
              <span>Save</span> {loading && <div className="loader" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(JSX, document.getElementById('modal')!);
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

export default CreateNewTraining;
