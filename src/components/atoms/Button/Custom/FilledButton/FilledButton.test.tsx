import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import colors from '@/utils/colors';

import FilledButton from './FilledButton';

describe('FilledButton Component', () => {
  it('renders correctly with props', () => {
    const mockOnClick = jest.fn();
    render(
      <FilledButton
        height="50"
        width="200"
        color={colors.red_600}
        fontSize="16"
        onClick={mockOnClick}
      >
        Click Me
      </FilledButton>,
    );

    const button = screen.getByTestId('filled-button');

    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders correctly with props', () => {
    const mockOnClick = jest.fn();
    render(
      <FilledButton
        height="50"
        width="200"
        color={colors.blue_800}
        fontSize="16"
        onClick={mockOnClick}
      >
        Click Me
      </FilledButton>,
    );

    const button = screen.getByTestId('filled-button');

    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders correctly with props', () => {
    const mockOnClick = jest.fn();
    render(
      <FilledButton
        height="50"
        width="200"
        color={colors.gray_900}
        fontSize="16"
        onClick={mockOnClick}
      >
        Click Me
      </FilledButton>,
    );

    const button = screen.getByTestId('filled-button');

    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders correctly with props', () => {
    const mockOnClick = jest.fn();
    render(
      <FilledButton
        height="50"
        width="200"
        color={colors.transparent}
        fontSize="16"
        onClick={mockOnClick}
      >
        Click Me
      </FilledButton>,
    );

    const button = screen.getByTestId('filled-button');

    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders correctly with props', () => {
    const mockOnClick = jest.fn();
    render(
      <FilledButton
        height="50"
        width="200"
        color={colors.orange_500}
        fontSize="16"
        onClick={mockOnClick}
      >
        Click Me
      </FilledButton>,
    );

    const button = screen.getByTestId('filled-button');

    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
