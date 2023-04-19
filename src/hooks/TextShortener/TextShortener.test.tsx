import { renderHook } from '@testing-library/react';
import useTextShortener from './TextShortener.hook';

describe('TextShortener hook', () => {
  it('should create a short version of the argument string', () => {
    const { result } = renderHook(() => useTextShortener('Hello World!', 5));
    expect(result.current.text).toEqual('Hello...');
    expect(result.current.isShort).toBeTruthy();
  });

  it('should return argument string', () => {
    const { result } = renderHook(() => useTextShortener('Hello World!', 14));
    expect(result.current.text).toEqual('Hello World!');
    expect(result.current.isShort).toBeFalsy();
  });
});
