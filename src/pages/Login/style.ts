import styled from 'styled-components';

import colors from '@/utils/colors';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 8px;
  width: 192px;
  background-color: ${colors.blue_400};
  padding: 16px;
  border-radius: 8px;
`;
