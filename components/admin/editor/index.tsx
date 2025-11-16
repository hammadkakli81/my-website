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
      <div className="bg-white/70 backdrop-blur-xl border border-blue-200/30 rounded-2xl p-4 md:p-6 shadow-lg overflow-hidden">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md py-3 rounded-xl mb-4 px-2">
          {/* Thumbnail Selector and Submit */}
          <div className="mb-3 flex items-center justify-between flex-wrap gap-4">
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
            className="mb-3 w-full border border-blue-200/30 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 text-2xl md:text-3xl font-semibold text-gray-800 outline-none focus:border-blue-400 focus:bg-white transition placeholder:text-gray-400"
            placeholder="Title"
            value={post.title}
            onChange={({ target: { value: title } }) =>
              setPost(prev => ({ ...prev, title }))
            }
          />

          <div className="overflow-x-auto">
            <ToolBar
              editor={editor}
              onOpenImageClick={() => setShowGallery(true)}
            />
          </div>

          <div className="my-3 h-[1px] w-full bg-blue-200/30" />
        </div>

        <div className="px-2">
          {editor && <EditLink editor={editor} />}

          <EditorContent editor={editor} className="min-h-[300px] prose prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-800 prose-a:text-blue-600 max-w-full overflow-x-auto" />

          <div className="my-3 h-[1px] w-full bg-blue-200/30" />

          <SeoForm
            title={post.title}
            onChange={handleSeoChange}
            initialValue={seoInitialValue}
          />
        </div>
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
