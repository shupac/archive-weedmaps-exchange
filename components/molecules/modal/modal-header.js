import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'lib/styles/theme';
import { rem } from 'polished';
import { color } from 'lib/styles/theme-getters';

const ModalHeader = styled.div`
  width: 100%;
  height: ${rem(45)};
  background-color: ${color('porcelain')};
  border-radius: ${rem(3)} ${rem(3)} 0 0;
  border-bottom: 1px solid ${color('iron')};
  line-height: ${rem(45)};
  padding-left: ${rem(16)};
  font-size: ${rem(18)};
  font-weight: ${400};
  color: ${color('charcoal')};
`;

ModalHeader.propTypes = {
  theme: PropTypes.object,
};

ModalHeader.defaultProps = {
  theme,
};

export default ModalHeader;
