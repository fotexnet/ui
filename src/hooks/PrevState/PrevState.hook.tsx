import isEqual from 'lodash.isequal';
import { useRef } from 'react';

function usePrevState<TState>(state: TState): TState | undefined {
  const currentRef = useRef<TState>(state);
  const previousRef = useRef<TState>();

  if (!isEqual(currentRef.current, state)) {
    previousRef.current = currentRef.current;
    currentRef.current = state;
  }

  return previousRef.current;
}

export default usePrevState;
