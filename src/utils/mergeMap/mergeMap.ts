function mergeMap<T extends Map<unknown, unknown>>(baseMap: T, submittedMap: T): T {
  const map: Map<unknown, unknown> = new Map<unknown, unknown>(baseMap);

  for (const [key, value] of submittedMap.entries()) {
    map.set(key, value);
  }

  return map as T;
}

export default mergeMap;
