import { act, renderHook } from '@testing-library/react';
import useStorage from './Storage.hook';

describe('Storage hook', () => {
  const key: string = 'A';
  const value: string = 'Hello World!';

  describe('localStorage', () => {
    let localStorageGetSpy: jest.SpyInstance;
    let localStorageSetSpy: jest.SpyInstance;
    let localStorageRemoveSpy: jest.SpyInstance;

    beforeEach(() => {
      localStorageGetSpy = jest.spyOn(window.localStorage.__proto__, 'getItem');
      localStorageSetSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
      localStorageRemoveSpy = jest.spyOn(window.localStorage.__proto__, 'removeItem');
    });

    afterEach(() => {
      localStorageGetSpy.mockRestore();
      localStorageSetSpy.mockRestore();
      localStorageRemoveSpy.mockRestore();
    });

    it('should mount', () => {
      renderHook(() => useStorage('localStorage', key));
      expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.getItem).toHaveBeenCalledWith(key);
    });
    it('should mount with default value', () => {
      const { result } = renderHook(() => useStorage('localStorage', key, value));
      expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.getItem).toHaveBeenCalledWith(key);
      expect(result.current.value).toEqual(value);
    });
    it('should update value', () => {
      const { result } = renderHook(() => useStorage('localStorage', key));
      act(() => result.current.update(value));
      expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
      expect(result.current.value).toEqual(value);
    });
    it('should remove item', () => {
      const { result } = renderHook(() => useStorage('localStorage', key, value));
      act(() => result.current.remove());
      expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.removeItem).toHaveBeenCalledWith(key);
      expect(result.current.value).toEqual(undefined);
    });
  });

  describe('sessionStorage', () => {
    let sessionStorageGetSpy: jest.SpyInstance;
    let sessionStorageSetSpy: jest.SpyInstance;
    let sessionStorageRemoveSpy: jest.SpyInstance;

    beforeEach(() => {
      sessionStorageGetSpy = jest.spyOn(window.sessionStorage.__proto__, 'getItem');
      sessionStorageSetSpy = jest.spyOn(window.sessionStorage.__proto__, 'setItem');
      sessionStorageRemoveSpy = jest.spyOn(window.sessionStorage.__proto__, 'removeItem');
    });

    afterEach(() => {
      sessionStorageGetSpy.mockRestore();
      sessionStorageSetSpy.mockRestore();
      sessionStorageRemoveSpy.mockRestore();
    });

    it('should mount', () => {
      renderHook(() => useStorage('sessionStorage', key));
      expect(window.sessionStorage.getItem).toHaveBeenCalledTimes(1);
      expect(window.sessionStorage.getItem).toHaveBeenCalledWith(key);
    });
    it('should mount with default value', () => {
      const { result } = renderHook(() => useStorage('sessionStorage', key, value));
      expect(window.sessionStorage.getItem).toHaveBeenCalledTimes(1);
      expect(window.sessionStorage.getItem).toHaveBeenCalledWith(key);
      expect(result.current.value).toEqual(value);
    });
    it('should update value', () => {
      const { result } = renderHook(() => useStorage('sessionStorage', key));
      act(() => result.current.update(value));
      expect(window.sessionStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.sessionStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
      expect(result.current.value).toEqual(value);
    });
    it('should remove item', () => {
      const { result } = renderHook(() => useStorage('sessionStorage', key, value));
      act(() => result.current.remove());
      expect(window.sessionStorage.removeItem).toHaveBeenCalledTimes(1);
      expect(window.sessionStorage.removeItem).toHaveBeenCalledWith(key);
      expect(result.current.value).toEqual(undefined);
    });
  });
});
