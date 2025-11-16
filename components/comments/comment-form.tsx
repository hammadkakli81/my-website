import { useEffect, type FC } from 'react';
import { EditorContent } from '@tiptap/react';
import { getFocusedEditor } from '../admin/editor/editor-utils';
import { ActionButton } from '../admin/ui/action-button';
import { useEditorConfig } from './use-editor-config';

type Props = {
  placeholder?: string;
  title?: string;
  busy?: boolean;
  btnTitle?: string;
  initialState?: string;
  onSubmit?: (content: string) => void;
  onClose?: () => void;
};

const CommentForm: FC<Props> = ({
  placeholder,
  title,
  busy = false,
  btnTitle,
  initialState,
  onSubmit,
  onClose,
}) => {
  const { editor } = useEditorConfig({
    placeholder: placeholder ?? 'Add your comment...',
  });

  const handleSubmit = () => {
    if (!editor || busy) return;

    const value = editor.getHTML();
    if (value === '<p></p>') return;
    onSubmit && onSubmit(value);
  };

  useEffect(() => {
    if (editor) {
      getFocusedEditor(editor).setContent(initialState!).run();
    }
  }, [editor, initialState]);

  return (
    <div>
      {!!title && (
        <h1 className="py-3 text-xl font-semibold text-gray-800">
          {title}
        </h1>
      )}
      <EditorContent
        onClick={() => getFocusedEditor(editor!).run()}
        className="min-h-[100px] cursor-text rounded-xl border border-blue-200/30 bg-white/80 backdrop-blur-sm p-4 focus-within:border-blue-400 focus-within:bg-white transition"
        editor={editor}
      />

      <div className="justify-end py-3 md:flex">
        <div className="flex space-x-4">
          <ActionButton
            title={btnTitle ?? 'Submit'}
            onClick={handleSubmit}
            busy={busy}
          />

          {!!onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-blue-200/30 text-gray-700 hover:bg-white/90 transition"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { CommentForm };
