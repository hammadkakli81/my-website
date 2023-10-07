import Image from 'next/image';
import { type FC } from 'react';
import { CheckMark } from '@/components/admin/ui/check-mark';
import { AiFillDelete } from 'react-icons/ai';
import { useImageDelete } from '../editor-hooks';

type Props = {
  public_id: string;
  src: string;
  selected?: boolean;
  onClick?: () => void;
  whichDeleted?: (public_id: string) => void;
};

const GalleryImage: FC<Props> = ({
  src,
  public_id,
  selected,
  onClick,
  whichDeleted,
}) => {
  const { deleteImage, deleting } = useImageDelete();

  const deleteHandler = async (e: any) => {
    e.stopPropagation();
    await deleteImage(public_id);
    whichDeleted && whichDeleted(public_id);
  };

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer overflow-hidden rounded"
    >
      <Image
        src={src}
        width={200}
        height={200}
        alt="gallery"
        className="aspect-square bg-secondary-light object-cover transition hover:scale-110"
      />

      <div className="absolute left-2 top-2">
        <CheckMark visible={selected || false} />
      </div>

      <div
        onClick={deleteHandler}
        className="absolute h-7 w-7 flex items-center justify-center right-2 top-2 transition bg-gray-700 hover:bg-gray-400 p-1 rounded"
      >
        {deleting ? (
          <div className="text-white">...</div>
        ) : (
          <AiFillDelete className="text-white" size={18} />
        )}
      </div>
    </div>
  );
};

export { GalleryImage };
