import React, { ReactElement, ReactNode } from 'react';

export const useCreateElement = (
  type: TypeOption,
  classes: string,
  children: JSX.Element | string | ReactNode
): ReactElement => {
  return React.createElement(type, { className: classes }, children);
};
