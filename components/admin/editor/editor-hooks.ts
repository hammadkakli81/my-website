import { useFetch } from '@/hooks/use-fetch';
import { useMutation } from '@/hooks/use-mutation';

type Image = { src: string; public_id: string };

export function useImages() {
  const { data, updateData: updateImages } = useFetch<{ images: Image[] }>({
    url: '/api/image',
    defaultValue: { images: [] },
  });

  return { images: data.images, updateImages };
}

export function useImageUpload() {
  const { mutateData, mutating } = useMutation<Image | null>({
    url: '/api/image',
    defaultValue: null,
    method: 'post',
  });

  const uploadImage = (image: File) => {
    const formData = new FormData();
    // this 'image' is also same in the api
    formData.append('image', image);

    return mutateData(formData);
  };

  return { uploadImage, isUploading: mutating };
}

export function useImageDelete() {
  const { mutateData, mutating, error } = useMutation<null>({
    defaultValue: null,
    method: 'delete',
  });

  const deleteImage = async (public_id: string) => {
    await mutateData(null, `/api/image/${public_id}`);
    return { public_id };
  };

  return { deleteImage, deleting: mutating };
}
