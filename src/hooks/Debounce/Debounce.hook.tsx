import { useEffect, useRef } from 'react';

function useDebounce(callback: () => void, delay: number = 1000): void {
  const render = useRef<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      callback();
    }, delay);

    const clear = () => {
      clearTimeout(timeout);
    };

    if (render.current === 0) {
      render.current++;
      clear();
    }

    return clear;
  }, [callback]);
}

export default useDebounce;
