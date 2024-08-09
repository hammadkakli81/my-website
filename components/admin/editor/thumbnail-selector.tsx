import classNames from 'classnames';
import Image from 'next/image';
import { ChangeEventHandler, useState, type FC } from 'react';

type Props = { initialValue?: string; onChange?: (file: File) => void };

const ThumbnailSelector: FC<Props> = ({ initialValue, onChange }) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(
    initialValue || ''
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { files } = e.target;
    if (!files) return;

    const file = files[0];
    setSelectedThumbnail(URL.createObjectURL(file));
    onChange && onChange(file);
  };

  return (
    <div className="w-32">
      <input
        hidden
        type="file"
        accept="image/*"
        id="thumbnail"
        onChange={handleChange}
      />
      <label htmlFor="thumbnail">
        {selectedThumbnail ? (
          <Image
            width={128}
            height={72}
            src={selectedThumbnail}
            alt="Thumbnail"
            className={classNames(commonClass, 'object-cover')}
          />
        ) : (
          <PosterUI label="Thumbnail" />
        )}
      </label>
    </div>
  );
};

const commonClass =
  'flex items-center justify-center border border-dashed border-secondary-dark dark:border-secondary-light rounded cursor-pointer aspect-video';

const PosterUI: FC<{ label: string; className?: string }> = props => {
  return (
    <div className={classNames(commonClass, props.className)}>
      <span className="text-primary-dark dark:text-primary">{props.label}</span>
    </div>
  );
};

export { ThumbnailSelector };
