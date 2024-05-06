import { KITS_API_KEY, KITS_URL } from '@/utils/constants';
import { useEffect, useState } from 'react';

const headers = {
  Authorization: `Bearer ${KITS_API_KEY}`,
};

export function useGet<T>(path: string, parameters?: any) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const url = new URL(path, KITS_URL);
  const urlParameters = new URLSearchParams(parameters);
  url.search = urlParameters.toString();

  const fetchFromURL = async () => {
    setIsLoading(true);
    setError(false);

    return await fetch(url.href, { method: 'GET', headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`An error occurred with status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  };

  const retry = async () => {
    return await fetchFromURL();
  };

  useEffect(() => {
    fetchFromURL();
  }, [path]);

  return { data, isLoading, error, retry, setData };
}
