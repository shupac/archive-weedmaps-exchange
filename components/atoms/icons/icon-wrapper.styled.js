import { shape, string } from 'prop-types';
import styled from 'styled-components';

const IconWrapper = styled.div`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size.width};
  height: ${({ size }) => size.height};
`;

IconWrapper.propTypes = {
  size: shape({ width: string, height: string }),
};

IconWrapper.defaultProps = {
  size: '42px',
};

export default IconWrapper;
