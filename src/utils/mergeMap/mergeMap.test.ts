import mergeMap from './mergeMap';

describe('mergeMap', () => {
  it('should merge 2 maps', () => {
    const baseMap = new Map<string, string>([
      ['a', '1'],
      ['b', '2'],
      ['c', '3'],
    ]);

    const submittedMap = new Map<string, string>([
      ['d', '1'],
      ['e', '2'],
      ['f', '3'],
    ]);

    const map = mergeMap(baseMap, submittedMap);
    const keys: string[] = [];
    const values: string[] = [];

    for (const [key, value] of map.entries()) {
      keys.push(key);
      values.push(value);
    }

    expect(keys).toMatchObject(['a', 'b', 'c', 'd', 'e', 'f']);
    expect(values).toMatchObject(['1', '2', '3', '1', '2', '3']);
  });

  it('should override base', () => {
    const baseMap = new Map<string, string>([
      ['a', '1'],
      ['b', '2'],
      ['c', '3'],
    ]);

    const submittedMap = new Map<string, string>([
      ['a', '3'],
      ['d', '4'],
    ]);

    const map = mergeMap(baseMap, submittedMap);
    const keys: string[] = [];
    const values: string[] = [];

    for (const [key, value] of map.entries()) {
      keys.push(key);
      values.push(value);
    }

    expect(keys).toMatchObject(['a', 'b', 'c', 'd']);
    expect(values).toMatchObject(['3', '2', '3', '4']);
  });
});
