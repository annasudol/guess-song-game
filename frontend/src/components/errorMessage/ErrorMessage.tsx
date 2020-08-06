import React, { FunctionComponent, ReactElement } from 'react';

interface ErrorMessageProps {
  message?: string;
}
export const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ message }): ReactElement => (
  <div className="flex justify-center items-center h-screen">
    <h2 className="font-albaSuper text-orange-500 text-5xl text-center pb-4">
      {message || 'Ups, error, something went wrong'}
    </h2>
  </div>
);
