import styled from 'styled-components';

import { Button } from '@/components/atoms';

import colors from '@/utils/colors';

import { PropsType } from './FilledButton';

const defaultColor = colors.blue_800;

const hoverColor = (originalColor: any) => {
  switch (originalColor) {
    case colors.red_600:
      return colors.red_500;
    case colors.blue_800:
      return colors.blue_600;;
    case colors.gray_900:
      return colors.gray_700;
    case colors.transparent:
      return colors.transparent;
    default:
      return originalColor || defaultColor;
  }
};

export const CustomFilledButton = styled(Button)<PropsType>`
  &.ant-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 4px;
    border: unset;
    transition-duration: 200ms;
    border-radius: ${(p) => (p.height ? `${p.height}px` : `32px`)};
    border-color: ${(p) => (p.color ? p.color : defaultColor)};
    color: ${(p) =>
    p.color === colors.white ? colors.gray_900 : colors.white};
    background: ${(p) => (p.color ? p.color : defaultColor)};
    min-width: ${(p) => (p.width ? `${p.width}px` : `100%`)};
    height: ${(p) => (p.height ? `${p.height}px` : `32px`)};
    min-height: ${(p) => (p.height ? `${p.height}px` : `32px`)};
    font-size: ${(p) => (p.fontSize ? `${p.fontSize}px` : `1rem`)};
    font-weight: 500;
    padding: 4px 8px;

    &.ant-btn-circle {
      padding: 0;
    }

    &[ant-click-animating-without-extra-node='true']::after {
      border-color: ${(p) => p.hoveredColor || hoverColor(p.color)};
      --antd-wave-shadow-color: ${(p) => p.hoveredColor || hoverColor(p.color)};
    }

    &.ant-btn:hover,
    &.ant-btn:focus,
    &.ant-btn:active {
      color: ${colors.white};
      background: ${(p) => p.hoveredColor || hoverColor(p.color)};
      border-color: ${(p) => p.hoveredColor || hoverColor(p.color)};
    }

    &[disabled],
    &[disabled]:hover,
    &[disabled]:focus,
    &[disabled]:active {
      color: ${colors.white};
      background: ${colors.gray_500};
      border-color: ${colors.gray_500};
    }

    & > span {
      line-height: 1;
    }
  }
`;
