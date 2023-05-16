import extractDirty from '../../utils/form-utils/extractDirty';

function useFormUtils(): UseFormUtils {
  return { extractDirty };
}

export default useFormUtils;

export type UseFormUtils = {
  extractDirty: (baseObj: Record<string, unknown>, submittedObj: Record<string, unknown>) => Record<string, unknown>;
};
