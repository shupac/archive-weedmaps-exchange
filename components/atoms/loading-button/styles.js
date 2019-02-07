import WmTheme from '@ghostgroup/ui.theme';
import Button from '@ghostgroup/ui.button';
import styled from 'styled-components';

const { state } = WmTheme.style;

const ButtonLoadingProgress = styled(Button)`
  background: ${props =>
    props.isLoading ? `${state.dark}` : `${state.primary}`};
  height: ${({ size }) => size.height};
  width: ${({ size }) => size.width};
  align-items: center;
  color: ${state.secondary};
  border-color: ${props =>
    props.isLoading ? `${state.dark}` : `${state.primaryCompanion}`};
  opacity: ${props => (props.isLoading ? '0.8' : '1')};
  > span {
    margin-left: 10px;
  }
`;

ButtonLoadingProgress.displayName = 'ButtonLoadingProgress';

export default ButtonLoadingProgress;
