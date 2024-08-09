import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useRef, useState } from 'react';

type M = 'post' | 'delete' | 'patch';
type Props<T> = {
  url?: string;
  method: M;
  defaultValue: T;
};

export function useMutation<T>(props: Props<T>) {
  const { url, method, defaultValue } = props;

  const [data, setData] = useState<T>(defaultValue);
  const [error, setError] = useState('');
  const [mutating, setMutating] = useState(false);

  const mutateData = useCallback<
    (body: any, secondary_url?: string) => Promise<T>
  >(
    async (body: any, secondary_url?: string) => {
      setData(defaultValue);
      setError('');
      setMutating(true);

      try {
        const { data } = await axios[method](secondary_url ?? url!, body);
        setData(data);
        return data;
      } catch (err: any) {
        setError(err.response.data.error || 'Something went wrong');
      } finally {
        setMutating(false);
      }

      return null;
    },
    [method, url]
  );

  const updateData = (fn: (prev: T) => T) => {
    setData(fn(data!));
  };

  return { data, error, mutating, mutateData, updateData };
}

type Props2<T> = {
  url?: string;
  method: M;
  defaultValue: T;
  config?: AxiosRequestConfig;
  onMutate?: (data: T) => void;
};

export function useMutation2<T>(props: Props2<T>) {
  let { url, method, defaultValue, config, onMutate } = props;

  defaultValue = useRef(defaultValue).current;
  config = useRef(config).current;

  const [data, setData] = useState<T>(() => defaultValue);
  const [error, setError] = useState<any>(null);
  const [mutating, setMutating] = useState(false);

  const mutateData = useCallback(
    async (body: any, scopedUrl?: string) => {
      setMutating(true);
      setError(null);
      setData(defaultValue);

      try {
        const { data: reqData } = await axios[method](
          scopedUrl ?? url!,
          body,
          config
        );
        onMutate && onMutate(reqData);
        setData(reqData);
      } catch (err: any) {
        const error = err.response.data.error;

        setError(error);
      } finally {
        setMutating(false);
      }

      return null;
    },
    [method, url, defaultValue, config, onMutate]
  );

  const updateData = (fn: (prev: T) => T) => {
    setData(prev => fn(prev));
  };

  return { data, error, mutating, mutateData, updateData };
}
