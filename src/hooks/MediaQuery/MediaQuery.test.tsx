import { renderHook } from '@testing-library/react';
import useMediaQuery from './MediaQuery.hook';

describe('MediaQuery hook', () => {
  const originalMatchMedia = window.matchMedia;
  const query: string = '(min-width: 360px) and (max-width: 480px)';

  beforeEach(() => {
    window.matchMedia = jest
      .fn()
      .mockImplementation(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('should mount', () => {
    renderHook(() => useMediaQuery(query));
    expect(window.matchMedia).toHaveBeenCalledTimes(1);
    expect(window.matchMedia).toHaveBeenCalledWith(query);
  });
  it('should match media', () => {
    window.matchMedia = jest
      .fn()
      .mockImplementation(() => ({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
    const { result } = renderHook(() => useMediaQuery(query));
    expect(window.matchMedia).toHaveBeenCalledTimes(1);
    expect(window.matchMedia).toHaveBeenCalledWith(query);
    expect(result.current).toBeTruthy();
  });
  it('should NOT match media', () => {
    const { result } = renderHook(() => useMediaQuery(query));
    expect(window.matchMedia).toHaveBeenCalledTimes(1);
    expect(window.matchMedia).toHaveBeenCalledWith(query);
    expect(result.current).toBeFalsy();
  });
});
