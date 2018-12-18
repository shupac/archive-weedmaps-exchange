import PropTypes from 'prop-types';
import { rem } from 'polished';
import { color } from 'lib/styles/theme-getters';
import theme from 'lib/styles/theme';
import styled, { css } from 'styled-components';
import { Button as uiButton } from '@ghostgroup/ui';
/* eslint-disable no-unused-vars */
export const ButtonBase = css`
  cursor: pointer;
  height: ${rem(40)};
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 3px;
  font-size: ${rem('14px')};
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: background-color 0.3s ease-in-out;
  background-color: ${color('white')};
`;
/* eslint-enable no-unused-vars */

const Button = styled.button`
  width: ${props => rem(props.w)};
  height: ${props => rem(props.h)};
  display: flex;
  align-items: center;
  border: 1px solid
    ${props => (props.primary ? color('darkTeal') : color('iron'))};
  border-radius: ${rem(3)};
  background-color: ${color('white')};
  font-weight: 300;
  font-size: 12px;
  line-height: normal;
  justify-content: center;
  text-transform: capitalize;
  cursor: pointer;
`;

Button.propTypes = {
  theme: PropTypes.object,
  w: PropTypes.number,
  h: PropTypes.number,
  primary: PropTypes.bool,
};

Button.defaultProps = {
  theme,
  w: 100,
  h: 20,
  primary: false,
};

export default Button;

export const ButtonPrimary = styled(uiButton)`
  ${ButtonBase};
  font-size: ${props => (props.fontSize ? rem(props.fontSize) : rem(14))};
  width: ${props => (props.width ? rem(props.width) : '100%')};
  height: ${props => rem(props.h)};
  background: ${theme.style.state.primary};
  border: 1px solid ${theme.colors.persianGreen};
  color: ${theme.style.text.inverted};
  font-weight: ${props => props.weight};
  font-family: ${theme.text.proximaNovaFont};
`;
ButtonPrimary.propTypes = {
  theme: PropTypes.object,
  width: PropTypes.number,
  h: PropTypes.number,
  primary: PropTypes.bool,
  weight: PropTypes.number,
  fontSize: PropTypes.number,
};
ButtonPrimary.defaultProps = {
  theme,
  weight: 600,
  h: 40,
};
ButtonPrimary.displayName = 'ButtonPrimary';

export const ButtonGradient = styled.button`
  ${ButtonBase};
  width: 100%;
  background: ${theme.colors.bg.grayGradient};
  border: 1px solid ${theme.style.border.default};
  color: ${theme.style.text.normal};
  font-weight: 600;
`;
ButtonGradient.displayName = 'ButtonGradient';

export const ButtonWhite = styled(uiButton)`
  ${ButtonBase};
  width: ${props => (props.w ? rem(props.w) : '100%')};
  background: ${theme.style.state.secondary};
  border: 1px solid ${theme.style.border.default};
  box-shadow: 0 1px 3px 0 ${theme.style.shadow};
  :hover {
    background: ${theme.style.background.secondary};
    border: 1px solid ${theme.style.state.secondary};
  }
`;
ButtonWhite.displayName = 'ButtonWhite';

export const ButtonWhiteNoHover = styled(uiButton)`
  ${ButtonBase};
  width: ${props => (props.w ? rem(props.w) : '100%')};
  background: ${theme.style.state.secondary};
  border: 1px solid ${theme.style.border.default};
`;
ButtonWhite.displayName = 'ButtonWhiteNoHover';
