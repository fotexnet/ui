import { useCallback, useEffect, useState } from 'react';

function useStorage<TValue = string>(storage: Storage, key: string): StorageObject<TValue>;
function useStorage<TValue>(storage: Storage, key: string, initialValue: TValue): StorageObject<TValue>;
function useStorage<TValue>(storage: Storage, key: string, initialValue?: TValue): StorageObject<TValue> {
  const [value, setValue] = useState<TValue | undefined>(() => {
    if (typeof window === 'undefined') return;

    const jsonValue = window[storage].getItem(key);
    if (jsonValue === null) return initialValue;

    try {
      return JSON.parse(jsonValue);
    } catch (_) {
      return jsonValue;
    }
  });

  useEffect(() => {
    if (!value) return;
    window[storage].setItem(key, JSON.stringify(value));
  }, [storage, key, value]);

  const update = useCallback((newValue: TValue) => {
    setValue(newValue);
  }, []);

  const remove = useCallback(() => {
    window[storage].removeItem(key);
    setValue(undefined);
  }, [storage, key]);

  return { value, update, remove };
}

export default useStorage;

export type Storage = 'localStorage' | 'sessionStorage';

export type StorageObject<TValue> = {
  value: TValue | undefined;
  update: (newValue: TValue) => void;
  remove: () => void;
};
