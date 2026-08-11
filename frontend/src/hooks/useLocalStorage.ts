import { useState, useCallback, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State för att lagra värdet
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      console.warn(`Fel vid läsning av ${key} från localStorage`);
      return initialValue;
    }
  });

  // useCallback för att inte skapa ny funktion på varje render
  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        console.warn(`Fel vid skrivning av ${key} till localStorage`);
      }
    },
    [key]
  );

  return [storedValue, setValue];
}
