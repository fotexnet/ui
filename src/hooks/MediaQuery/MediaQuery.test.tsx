import { renderHook } from '@testing-library/react';
import useMediaQuery from './MediaQuery.hook';

describe('MediaQuery hook', () => {
  it('should mount', () => {
    const { result } = renderHook(() => useMediaQuery());
    expect(result.current).toBe('Hello World!');
  });
});
