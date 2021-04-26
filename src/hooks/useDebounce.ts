import { useState, useEffect } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!value.length || value.length > 2) {
        setDebouncedValue(value);
      }
    }, delay);
    return () => clearTimeout(handler);
  }, [delay, value]);

  return debouncedValue;
};
