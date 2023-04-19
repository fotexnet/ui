import { renderHook } from '@testing-library/react';
import useTextShortener from './TextShortener.hook';

describe('TextShortener hook', () => {
  it('should mount', () => {
    const { result } = renderHook(() => useTextShortener());
    expect(result.current).toBe('Hello World!');
  });
});
