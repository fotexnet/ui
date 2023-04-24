import React, { Fragment } from 'react';

function createLayout(parts: JSX.Element[], position: number): HigherOrderComponent {
  const elements: (JSX.Element | null)[] = [...parts];
  elements.splice(position, 0, null);

  return <TProps extends object>(Component: React.ComponentType<TProps>): React.FC<TProps> => {
    return props => {
      return (
        <>
          {elements.map(element => {
            if (!element) return <Component key={JSON.stringify(props)} {...props} />;
            return <Fragment>{element}</Fragment>;
          })}
        </>
      );
    };
  };
}

export default createLayout;

type HigherOrderComponent = <TProps extends object>(Component: React.ComponentType<TProps>) => React.FC<TProps>;
