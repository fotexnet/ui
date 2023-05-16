import { renderHook } from '@testing-library/react';
import useDebounce from './Debounce.hook';

describe('Debounce hook', () => {
  it('should debounce callback', () => {
    let value: number = 0;
    renderHook(() => useDebounce(() => value++, 1000));
    expect(value).toEqual(0);
    setTimeout(() => {
      expect(value).toEqual(1);
    }, 1050);
  });
});
