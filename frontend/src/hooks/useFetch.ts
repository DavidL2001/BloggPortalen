import { useState, useCallback } from 'react';

interface FetchOptions extends Omit<RequestInit, 'headers'> {
  token?: string;
  headers?: Record<string, string>;
}

export function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async <T,>(
    url: string,
    options?: FetchOptions
  ): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options?.headers as Record<string, string> || {}),
      };

      // Lägg till Authorization-header om token finns
      if (options?.token) {
        headers.Authorization = `Bearer ${options.token}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || 'Något gick fel';
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      setLoading(false);
      return data as T;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Okänt fel';
      setError(message);
      setLoading(false);
      throw err;
    }
  }, []);

  return { request, loading, error };
}
