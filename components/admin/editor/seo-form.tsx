import { useState, type FC, type ChangeEventHandler, useEffect } from 'react';
import classNames from 'classnames';
import slugify from 'slugify';

const commonInput =
  'w-full rounded-xl border border-blue-200/30 bg-white/80 backdrop-blur-sm p-3 text-gray-800 outline-none transition focus:border-blue-400 focus:bg-white placeholder:text-gray-400';

export type SeoResult = { slug: string; tags: string; meta: string };

type Props = {
  title?: string;
  onChange?: (seo: SeoResult) => void;
  initialValue?: SeoResult;
};

const emptySeo = {
  slug: '',
  tags: '',
  meta: '',
};

const SeoForm: FC<Props> = ({ title, initialValue, onChange }) => {
  const [seoFormState, setSeoFormState] = useState<SeoResult>(() =>
    initialValue
      ? {
          ...initialValue,
          slug: slugify(initialValue.slug),
        }
      : emptySeo
  );

  // this will handle the onChange state for outer components
  useEffect(() => {
    setSeoFormState(prev => ({
      ...prev,
      slug: slugify(title?.toLowerCase() ?? ''),
    }));
  }, [title, onChange]);

  useEffect(() => {
    if (initialValue) setSeoFormState({ ...initialValue });
  }, [initialValue]);

  useEffect(() => {
    onChange && onChange(seoFormState);
  }, [seoFormState, onChange]);

  const onChangeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target: { name, value } }) => {
    setSeoFormState(prev => {
      if (name === 'meta' && prev.meta.length === 150)
        return { ...prev, meta: value.substring(0, 150) };

      return { ...prev, [name]: value };
    });

    onChange && onChange(seoFormState);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-800">
        SEO Section
      </h1>

      <Input
        label="Slug:"
        name="slug"
        placeholder="slug-goes-here"
        className="pl-16 italic"
        value={seoFormState.slug}
        onChange={onChangeHandler}
      />

      <Input
        label="Tags:"
        name="tags"
        placeholder="React, Next JS"
        className="pl-16"
        value={seoFormState.tags}
        onChange={onChangeHandler}
      />

      <div className="relative">
        <textarea
          name="meta"
          className={classNames(commonInput, 'h-24 resize-none text-base pr-16')}
          placeholder="Meta Description: 150 characters will be fine."
          value={seoFormState.meta}
          onChange={onChangeHandler}
        />
        <p className="absolute bottom-3 right-3 text-sm text-gray-600 font-medium">
          {seoFormState.meta.length}/150
        </p>
      </div>
    </div>
  );
};

const Input: FC<{
  name: string;
  value?: string;
  placeholder: string;
  className?: string;
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ className, name, value, placeholder, label, onChange }) => {
  return (
    <label className="relative block">
      <span className="absolute top-1/2 -translate-y-1/2 left-3 text-sm font-semibold text-gray-700 z-10">
        {label}
      </span>

      <input
        type="text"
        placeholder={placeholder}
        className={classNames(commonInput, className)}
        value={value}
        name={name}
        onChange={onChange}
      />
    </label>
  );
};

export { SeoForm };
