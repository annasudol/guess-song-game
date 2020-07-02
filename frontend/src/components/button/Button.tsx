import './Button.css';
import React, { FunctionComponent } from 'react';
import cx from 'classnames';

export interface ButtonProps {
  href?: {
    path: string;
    target?: boolean;
  };

  spacing?: {
    [key in MarginOptions]?: SpaceOption | NegativeSpaceOption;
  };
  font?: FontFamilyOption;
  className?: string;
  onClick?: VoidFunction;
  mainBtn?: boolean;
  value?: string[];
  disabled?: boolean;
}

export const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  href,
  children,
  spacing,
  font = 'font-alba',
  className,
  mainBtn,
  value,
  ...props
}) => {
  const marginValue = spacing && `${Object.keys(spacing)[0]}-${Object.values(spacing)[0]}`;

  const classValue = cx('btn', marginValue, font, className);
  const classNameMainBtn =
    'btn--game bg-transparent focus:outline-none hover:bg-orange-500 w-full md:w-5/12 text-orange-500 font-semibold hover:text-indigo-900 py-2 border border-orange-500 hover:border-transparent rounded m-1 mt-4';

  if (href) {
    return (
      <a href={href.path} className={classValue} {...props} target={href.target && '_blank'}>
        {children}
      </a>
    );
  }

  if (mainBtn) {
    return (
      <button value={value} className={cx(classNameMainBtn, className)} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button className={classValue} onClick={onClick}>
      {children}
    </button>
  );
};
