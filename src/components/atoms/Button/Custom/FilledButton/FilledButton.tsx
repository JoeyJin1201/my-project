import React from 'react';

import * as style from './style';

export interface PropsType {
  height: number | string;
  width: number | string;
  color: string;
  hoveredColor?: string;
  fontSize?: number | string;
  onClick: () => void;
  children: React.ReactNode;
}

const FilledButton: React.FC<PropsType> = ({
  height,
  width,
  color,
  children,
  ...props
}) => (
  <style.CustomFilledButton
    data-testid="filled-button"
    htmlType="button"
    height={height}
    width={width}
    color={color}
    {...props}
  >
    {children}
  </style.CustomFilledButton>
);

FilledButton.defaultProps = {
  hoveredColor: undefined,
  fontSize: undefined,
};

export default FilledButton;
