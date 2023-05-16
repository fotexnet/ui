import { renderHook } from '@testing-library/react';
import useFormUtils from './FormUtils.hook';

describe('FormUtils hook', () => {
  describe('extractDirty', () => {
    it('should extract dirty fields', () => {
      const { result } = renderHook(() => useFormUtils());
      const baseObj = { a: 1, b: 2, c: false };
      const submittedObj = { a: 1, b: 2, c: true };
      expect(result.current.extractDirty(baseObj, submittedObj)).toMatchObject({ c: true });
    });
    it('should throw error if any key is missing in submitted object', () => {
      const { result } = renderHook(() => useFormUtils());
      const baseObj = { a: 1, b: 2, c: false };
      const submittedObj = { a: 1, b: 2, d: 3 };
      expect(() => result.current.extractDirty(baseObj, submittedObj)).toThrow();
    });
  });
});
