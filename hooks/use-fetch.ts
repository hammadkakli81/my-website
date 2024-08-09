import axios, { type AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';

type Props<T> = {
  url: string;
  defaultValue: T;
  config?: AxiosRequestConfig;
};

export function useFetch<T>(props: Props<T>) {
  const { url, defaultValue, config } = props;

  const [data, setData] = useState<T>(defaultValue);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.get(url, config);
      setData(data);
    } catch (err: any) {
      setError(err.response.data.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [url, config]);

  const updateData = (fn: (prev: T) => T) => {
    setData(fn(data!));
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, updateData };
}

const cache: any = {};

type Props2<T> = {
  url?: string;
  defaultValue: T;
  config?: AxiosRequestConfig;
  // if this is false, we have to manually fetch the data,
  // that is required in pagination
  fetchOnMount?: boolean;
  key?: string;
  onFetch?: (data: T) => void;
  dontAddFromCacheBeforeFetching?: boolean;
};

export function useFetch2<T>(props: Props2<T>) {
  const {
    url,
    defaultValue,
    config,
    fetchOnMount = true,
    key,
    onFetch,
    dontAddFromCacheBeforeFetching = false,
  } = props;
  const [isFirstTimeFetching, setIsFirstTimeFetching] = useState(true);

  const [data, setData] = useState<T>(() =>
    key && cache[key] ? { ...cache[key] } : defaultValue
  );
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const fetchData = useCallback(
    async (scopedUrl?: string) => {
      if (isFirstTimeFetching) setLoading(true);
      setFetching(true);
      setError(null);
      if (!dontAddFromCacheBeforeFetching)
        setData(prev => (key && cache[key] ? { ...cache[key] } : prev));

      try {
        const { data } = await axios.get(url || scopedUrl!, config);
        if (key) cache[key] = data;
        onFetch && onFetch(data);
        setData(data);
      } catch (err: any) {
        setError(err.response.data.error || 'Something went wrong');
      } finally {
        setLoading(false);
        setFetching(false);
        setIsFirstTimeFetching(false);
      }
    },
    [
      url,
      config,
      isFirstTimeFetching,
      key,
      onFetch,
      dontAddFromCacheBeforeFetching,
    ]
  );

  const updateData = (fn: (prev: T) => T) => {
    setData(fn(data!));
  };

  useEffect(() => {
    if (fetchOnMount) fetchData();
  }, [fetchData, fetchOnMount]);

  const refetch = useCallback(
    async (scopedUrl?: string) => {
      fetchData(scopedUrl);
    },
    [fetchData]
  );

  return {
    fetchData,
    data,
    error,
    loading,
    fetching,
    updateData,
    refetch,
  };
}
