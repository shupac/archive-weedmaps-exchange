import styled from 'styled-components';
import theme from 'lib/styles/theme';

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;

  span {
    margin-left: 16px;
    font-size: 14px;
    color: ${theme.colors.oxfordBlue};
    user-select: none;
  }
`;

export default { Row };
