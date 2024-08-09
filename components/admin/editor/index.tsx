import { FC, useCallback, useEffect, useState } from 'react';
import { useEditor, EditorContent, getMarkRange, Range } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import Image from '@tiptap/extension-image';

import { ToolBar } from './toolbar';
import { EditLink } from './link/edit-link';
import { GalleryModal, ImageSelectionResult } from './gallery-modal';
import { getFocusedEditor } from './editor-utils';
import { SeoForm, SeoResult } from './seo-form';
import { ActionButton } from '@/components/admin/ui/action-button';
import { ThumbnailSelector } from './thumbnail-selector';
import { useImageUpload, useImages } from './editor-hooks';
import { useUser } from '@/components/comments/comment-card';

export interface FinalPost extends SeoResult {
  title: string;
  content: string;
  thumbnail?: File | { src: string; public_id: string };
}

type Props = {
  onSubmit: (post: FormData, id?: string) => void;
  initialValue?: FinalPost;
  btnTitle?: string;
  busy?: boolean;
};

const emptyPost = {
  title: '',
  content: '',
  meta: '',
  tags: '',
  slug: '',
};

// NOTE: We are updating values initialState, for both scenarios SSR, and CSR, because in the case of SSR, the value will be present, but in the case of CSR, first the value will be null, then Value will be loaded
const Editor: FC<Props> = ({ initialValue, btnTitle, busy, onSubmit }) => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState(false);
  const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();
  const [post, setPost] = useState<FinalPost>(() => initialValue ?? emptyPost);
  const { user } = useUser();

  const { images, updateImages } = useImages();
  const { uploadImage, isUploading } = useImageUpload();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Type something',
      }),
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        // don't open it inside the editor
        openOnClick: false,
        HTMLAttributes: {
          // by default editor set the target to '_blank'
          target: '',
        },
      }),
      Youtube.configure({
        // you can know these values from youtube embed link from youtube.com
        HTMLAttributes: {
          class: 'w-full aspect-video rounded',
        },
      }),
      Image.configure({
        HTMLAttributes: { class: 'mx-auto' },
      }),
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;

        // if 'link' in the selection range, then we are going to get that range
        const selectionRange = getMarkRange(
          // this 'pos' is where we clicked inside the editor
          state.doc.resolve(pos),
          state.schema.marks.link
        );

        // range is where from the text starts, and to where the text ends
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        // these classes are coming from tailwind typography plugin
        class:
          'prose prose-lg prose-invert mx-auto h-full max-w-full focus:outline-none',
      },
    },
  });

  const handleImageSelection = ({ src, altText }: ImageSelectionResult) => {
    getFocusedEditor(editor!).setImage({ src, alt: altText }).run();
  };

  const handleImageUpload = async (image: File) => {
    const newImage = await uploadImage(image);
    if (newImage) {
      updateImages(prev => ({ images: [newImage, ...prev.images] }));
    }
  };

  const handleSeoChange = useCallback((result: SeoResult) => {
    setPost(prev => ({ ...prev, ...result }));
  }, []);

  const updateThumbnail = (file: File) =>
    setPost(prev => ({ ...prev, thumbnail: file }));

  const handleSubmit = () => {
    if (!editor) return;
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', editor.getHTML());
    formData.append('meta', post.meta);
    formData.append('slug', post.slug);
    formData.append('tags', post.tags);
    if (user?.role === 'admin') {
      formData.append('author', user.id as string);
    }
    if (post.thumbnail && post.thumbnail instanceof File) {
      formData.append('thumbnail', post.thumbnail);
    }

    // @ts-ignore
    onSubmit(formData, initialValue ? initialValue._id : undefined);
  };

  useEffect(() => {
    if (editor && selectionRange) {
      // this selection range will come if this is a link, so only if we clicked the link, then the text will be selected
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);

  useEffect(() => {
    if (initialValue) {
      editor?.commands.setContent(initialValue.content);

      const { slug, tags, meta } = initialValue;
      setSeoInitialValue({ slug, tags, meta });
    }
  }, [initialValue, editor]);

  return (
    <>
      <div className="bg-primary p-3 transition dark:bg-primary-dark">
        <div className="sticky top-0 z-10 bg-primary py-3 dark:bg-primary-dark">
          {/* Thumbnail Selector and Submit */}
          <div className="mb-3 flex items-center justify-between">
            <ThumbnailSelector
              onChange={updateThumbnail}
              initialValue={
                // @ts-ignore
                post.thumbnail && post.thumbnail.src
                  ? // @ts-ignore
                    (post.thumbnail.src as string)
                  : undefined
              }
            />
            <div className="inline-block">
              <ActionButton
                title={btnTitle ?? 'Submit'}
                onClick={handleSubmit}
                busy={busy}
                disabled={busy}
              />
            </div>
          </div>

          {/* Title Input */}
          <input
            type="text"
            className="mb-3 w-full border-0 border-b-[1px] border-secondary-dark bg-transparent py-2 text-3xl font-semibold italic text-primary-dark outline-none dark:border-secondary-light dark:text-primary"
            placeholder="Title"
            value={post.title}
            onChange={({ target: { value: title } }) =>
              setPost(prev => ({ ...prev, title }))
            }
          />

          <ToolBar
            editor={editor}
            onOpenImageClick={() => setShowGallery(true)}
          />

          <div className="my-3 h-[1px] w-full bg-secondary-dark dark:bg-secondary-light" />
        </div>

        {editor && <EditLink editor={editor} />}

        <EditorContent editor={editor} className="min-h-[300px]" />

        <div className="my-3 h-[1px] w-full bg-secondary-dark dark:bg-secondary-light" />

        <SeoForm
          title={post.title}
          onChange={handleSeoChange}
          initialValue={seoInitialValue}
        />
      </div>

      <GalleryModal
        uploading={isUploading}
        images={images}
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onFileSelect={handleImageUpload}
        onImageSelect={handleImageSelection}
      />
    </>
  );
};

export { Editor };
