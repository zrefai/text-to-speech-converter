import { KITS_API_KEY, KITS_URL } from '@/utils/constants';
import { useState } from 'react';

const headers = {
  Authorization: `Bearer ${KITS_API_KEY}`,
};

export function useMultipartFormRequest<T>(path: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = async (parameters: any) => {
    setIsLoading(true);
    setError(false);

    const url = new URL(path, KITS_URL);

    const formData = new FormData();
    Object.keys(parameters).forEach((key: string) => {
      formData.append(key, parameters[key]);
    });

    return await fetch(url, { method: 'POST', headers, body: formData })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`An error occurred with status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        setIsLoading(false);
        return response as T;
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  };

  return { request, isLoading, error };
}
