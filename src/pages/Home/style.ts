import styled from 'styled-components';

import colors from '@/utils/colors';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 8px;
  background-color: ${colors.gray_300};
  padding: 16px;
  border-radius: 8px;
`;
