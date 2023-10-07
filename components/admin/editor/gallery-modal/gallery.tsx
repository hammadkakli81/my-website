import { useState, type FC, useEffect } from 'react';
import { GalleryImage } from './gallery-image';
import { BsCardImage } from 'react-icons/bs';

type Image = { src: string; public_id: string };
type Props = {
  images: { src: string; public_id: string }[];
  onSelect?: (props: Image) => void;
  uploading?: boolean;
  selectedImage?: Image;
};

const Gallery: FC<Props> = ({
  images,
  uploading = false,
  selectedImage,
  onSelect,
}) => {
  const [images2, setImages2] = useState(images as Image[]);

  useEffect(() => {
    setImages2(images);
  }, [images]);

  return (
    <div className="flex flex-wrap">
      {uploading && (
        <div className="flex aspect-square basis-1/4 animate-pulse flex-col items-center justify-center rounded bg-secondary-light p-2 text-primary-dark">
          <BsCardImage size={60} />
          <p>Uploading</p>
        </div>
      )}

      {images2.map(({ src, public_id }, i) => (
        <div className="basis-1/4 p-2" key={i}>
          <GalleryImage
            whichDeleted={p =>
              setImages2(prev => prev.filter(item => item.public_id !== p))
            }
            src={src}
            public_id={public_id}
            selected={selectedImage?.src === src}
            onClick={() => onSelect && onSelect({ src, public_id })}
          />
        </div>
      ))}
    </div>
  );
};

export { Gallery };
