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
    const Page = withLayout(() => (
      <div key="layout-main" data-testid="part">
        Main
      </div>
    ));
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
    const Page = withLayout((props: WithLayoutProps) => (
      <div key="layout-main" data-testid="part">
        {props.text}
      </div>
    ));
    render(<Page text="Main" />);
    const elements = screen.queryAllByTestId('part');
    expect(elements.length).toEqual(3);
    expect(elements[0].textContent).toEqual('Header');
    expect(elements[1].textContent).toEqual('Main');
    expect(elements[2].textContent).toEqual('Footer');
  });

  it('should position component at index 0', () => {
    const withLayout = createLayout(layout, 0);
    const Page = withLayout(() => (
      <div key="layout-main" data-testid="part">
        Main
      </div>
    ));
    render(<Page />);
    const elements = screen.queryAllByTestId('part');
    expect(elements.length).toEqual(3);
    expect(elements[0].textContent).toEqual('Main');
    expect(elements[1].textContent).toEqual('Header');
    expect(elements[2].textContent).toEqual('Footer');
  });

  it('should position component at the end', () => {
    const withLayout = createLayout(layout, 5);
    const Page = withLayout(() => (
      <div key="layout-main" data-testid="part">
        Main
      </div>
    ));
    render(<Page />);
    const elements = screen.queryAllByTestId('part');
    expect(elements.length).toEqual(3);
    expect(elements[0].textContent).toEqual('Header');
    expect(elements[1].textContent).toEqual('Footer');
    expect(elements[2].textContent).toEqual('Main');
  });

  it('should add classes to layout wrapper', () => {
    const withLayout = createLayout(layout, 1, { wrapperClasses: 'layout-wrapper' });
    const Page = withLayout(() => (
      <div key="layout-main" data-testid="part">
        Main
      </div>
    ));
    render(<Page />);
    const wrapper = screen.queryByTestId('layout-wrapper');
    expect(wrapper?.classList.contains('layout-wrapper')).toBeTruthy();
  });

  it('should add classes to content wrapper', () => {
    const withLayout = createLayout(layout, 1, { mainClasses: 'main-wrapper' });
    const Page = withLayout(() => (
      <div key="layout-main" data-testid="part">
        Main
      </div>
    ));
    render(<Page />);
    const wrapper = screen.queryByRole('main');
    expect(wrapper?.classList.contains('main-wrapper')).toBeTruthy();
  });

  it('should add elements to main wrapper', () => {
    const withLayout = createLayout(layout, 1, { content: [<div key="1">1</div>, <div key="2">2</div>], position: 0 });
    const Page = withLayout(() => (
      <div key="layout-main" data-testid="part">
        Main
      </div>
    ));
    render(<Page />);
    const wrapper = screen.queryByRole('main');
    expect(wrapper?.childNodes.length).toBe(3);
  });
});
