import { render, screen } from '@testing-library/react';
import React from 'react';
import createLayout from './createLayout';

describe('createLayout', () => {
  const layout = [
    <div key="layout-header" data-testid="part">
      Header
    </div>,
    <div key="layout-footer" data-testid="part">
      Footer
    </div>,
  ];

  it('should create a higher-order component', () => {
    const withLayout = createLayout(layout, 1);
    const Page = withLayout(() => <div data-testid="part">Main</div>);
    render(<Page />);
    const elements = screen.queryAllByTestId('part');
    expect(elements.length).toEqual(3);
    expect(elements[0].textContent).toEqual('Header');
    expect(elements[1].textContent).toEqual('Main');
    expect(elements[2].textContent).toEqual('Footer');
  });

  it('should pass props to component', () => {
    type WithLayoutProps = { text: string };
    const withLayout = createLayout(layout, 1);
    const Page = withLayout((props: WithLayoutProps) => <div data-testid="part">{props.text}</div>);
    render(<Page text="Main" />);
    const elements = screen.queryAllByTestId('part');
    expect(elements.length).toEqual(3);
    expect(elements[0].textContent).toEqual('Header');
    expect(elements[1].textContent).toEqual('Main');
    expect(elements[2].textContent).toEqual('Footer');
  });

  it('should position component at index 0', () => {
    const withLayout = createLayout(layout, 0);
    const Page = withLayout(() => <div data-testid="part">Main</div>);
    render(<Page />);
    const elements = screen.queryAllByTestId('part');
    expect(elements.length).toEqual(3);
    expect(elements[0].textContent).toEqual('Main');
    expect(elements[1].textContent).toEqual('Header');
    expect(elements[2].textContent).toEqual('Footer');
  });

  it('should position component at the end', () => {
    const withLayout = createLayout(layout, 5);
    const Page = withLayout(() => <div data-testid="part">Main</div>);
    render(<Page />);
    const elements = screen.queryAllByTestId('part');
    expect(elements.length).toEqual(3);
    expect(elements[0].textContent).toEqual('Header');
    expect(elements[1].textContent).toEqual('Footer');
    expect(elements[2].textContent).toEqual('Main');
  });
});
