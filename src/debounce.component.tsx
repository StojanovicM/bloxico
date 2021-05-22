/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

export const useDebounce = (text: string, delay: number): string => {
  
  const [debouncedValue, setDebouncedValue] = useState(text)

  useEffect(() => {      
      const handler = setTimeout(() => { setDebouncedValue(text) }, delay)
      return () => clearTimeout(handler)
    },
    [text] 
  );

  return debouncedValue
}