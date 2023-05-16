import React, { useMemo } from 'react';

function createLayout(parts: JSX.Element[], position: number, options?: CreateLayoutOptions): HigherOrderComponent {
  return <TProps extends object>(Component: React.ComponentType<TProps>): React.FC<TProps> => {
    return props => {
      const component = useMemo(() => <Component key={JSON.stringify(props)} {...props} />, []);
      const content = useMemo(
        () => (
          <main key="layout-main" role="main" className={options?.mainClasses}>
            {options?.content !== undefined && options?.position !== undefined
              ? insertElement(options?.content, component, options?.position)
              : component}
          </main>
        ),
        []
      );
      const layout = useMemo(() => insertElement(parts, content, position), []);

      return (
        <div data-testid="layout-wrapper" className={options?.wrapperClasses}>
          {layout}
        </div>
      );
    };
  };
}

export default createLayout;

function insertElement(elements: JSX.Element[], element: JSX.Element, position: number): JSX.Element[] {
  const output: JSX.Element[] = [];
  for (let i: number = 0; i < elements.length; i++) {
    if (i === position) output.push(element);
    output.push(elements[i]);
  }
  if (position > elements.length) output.push(element);
  return output;
}

type HigherOrderComponent = <TProps extends object>(Component: React.ComponentType<TProps>) => React.FC<TProps>;
type CreateLayoutOptions = { wrapperClasses?: string; mainClasses?: string } & (
  | { content?: never; position?: never }
  | { content: JSX.Element[]; position: number }
);
