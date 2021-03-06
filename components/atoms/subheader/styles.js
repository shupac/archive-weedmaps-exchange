import WmTheme from '@ghostgroup/ui.theme';
import styled from 'styled-components';

const { background, shadow } = WmTheme.style;

const SubHeaderWrap = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  background-color: ${background.light};
  box-shadow: 0 1px 3px 0 ${shadow};
  z-index: 2;
  align-items: center;
  justify-content: space-between;
  button {
    margin-right: 16px;
  }
`;

export default SubHeaderWrap;
