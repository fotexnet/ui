import { act, renderHook } from '@testing-library/react';
import useToggle from './Toggle.hook';

describe('Toggle hook', () => {
  it('should initialize with falsy value', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.isActive).toBeFalsy();
    expect(result.current.toggle).toBeDefined();
  });
  it('should toggle value', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.isActive).toBeFalsy();
    act(() => result.current.toggle());
    expect(result.current.isActive).toBeTruthy();
  });
});
