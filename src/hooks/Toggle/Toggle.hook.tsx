import { useCallback, useState } from 'react';

function useToggle(initialValue: boolean = false): ToggleObject {
  const [isActive, setIsActive] = useState<boolean>(initialValue);

  const toggle = useCallback((value?: boolean) => {
    setIsActive(prev => value || !prev);
  }, []);

  return { isActive, toggle };
}

export default useToggle;

export type ToggleObject = { isActive: boolean; toggle: () => void };
