function extractDirty(
  baseObj: Record<string, unknown>,
  submittedObj: Record<string, unknown>
): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  const baseKeys = Object.getOwnPropertyNames(baseObj);
  const submittedKeys = Object.getOwnPropertyNames(submittedObj);
  const missingKeys = baseKeys.filter(key => !submittedKeys.includes(key));

  if (missingKeys.length > 0) throw new Error(`Submitted object has missing keys: ${missingKeys.join(',')}`);

  for (const key in baseObj) {
    if (baseObj[key] === submittedObj[key]) continue;
    obj[key] = submittedObj[key];
  }

  return obj;
}

export default extractDirty;

// TODO: optimize for objects and arrays
