import { fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import usePrevState from './PrevState.hook';

function Component() {
  const [state, setState] = useState<string>('Hello World!');
  const prevState = usePrevState(state);

  return (
    <div>
      <div data-testid="state">{state}</div>
      <div data-testid="prevState">{prevState}</div>
      <button data-testid="update" onClick={() => setState("I'm updated!")}>
        Update state
      </button>
    </div>
  );
}

describe('PrevState hook', () => {
  it('should mount with undefined', () => {
    render(<Component />);

    const state = screen.getByTestId('state');
    const prevState = screen.getByTestId('prevState');

    expect(state.textContent).toEqual('Hello World!');
    expect(prevState.textContent).toEqual('');
  });
  it('should capture previous state', () => {
    render(<Component />);

    const state = screen.getByTestId('state');
    const prevState = screen.getByTestId('prevState');
    const update = screen.getByTestId('update');

    expect(state.textContent).toEqual('Hello World!');
    expect(prevState.textContent).toEqual('');
    fireEvent.click(update);
    expect(state.textContent).toEqual("I'm updated!");
    expect(prevState.textContent).toEqual('Hello World!');
  });
});
