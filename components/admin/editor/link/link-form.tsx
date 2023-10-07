import { FC, useEffect, useState } from 'react';
import { validateLink } from '../editor-utils';

export type LinkOption = { url: string; openInNewTab: boolean };

type Props = {
  visible: boolean;
  onSubmit: (link: LinkOption) => void;
  initialState?: LinkOption;
};

const defaultLink = { url: '', openInNewTab: false };

const LinkForm: FC<Props> = ({ visible, initialState, onSubmit }) => {
  const [link, setLink] = useState<LinkOption>(initialState ?? defaultLink);

  const resetForm = () => setLink({ ...defaultLink });

  const handleSubmit = () => {
    if (!link.url.trim()) return;
    link.url = validateLink(link.url);

    onSubmit(link);
    resetForm();
  };

  if (!visible) return null;

  return (
    <div className="rounded bg-primary p-2 shadow-sm shadow-secondary-dark dark:bg-primary-dark">
      <input
        autoFocus
        type="text"
        value={link.url}
        onChange={({ target: { value: url } }) =>
          setLink(prev => ({ ...prev, url }))
        }
        placeholder="https://example.com"
        className="rounded border-2 outline-none border-secondary-dark bg-transparent p-2 text-primary-dark transition focus:border-primary-dark dark:text-primary dark:focus:border-primary"
      />
      <div className="mt-2 flex items-center space-x-2">
        <input
          className="h-5 w-5"
          type="checkbox"
          id="open-in-new-tab"
          checked={link.openInNewTab}
          onChange={({ target: { checked: openInNewTab } }) =>
            setLink(prev => ({ ...prev, openInNewTab }))
          }
        />
        <label className="text-primary text-sm" htmlFor="open-in-new-tab">
          Open in new Tab
        </label>

        <div className="flex-1 text-right">
          <button
            onClick={handleSubmit}
            className="rounded bg-action px-2 py-1 text-sm text-primary"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export { LinkForm };
