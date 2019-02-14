import styled from 'styled-components';

export const Wrapper = styled.div`
  color: ${({ theme }) => theme.style.text.normal};
  user-select: none;
  margin-bottom: 24px;
`;

export const Header = styled.div`
  height: 35px;
  display: flex;
  margin-bottom: 16px;
  font-size: 22px;
  font-weight: 600;
  align-items: center;
`;

export const Title = styled.div`
  margin-right: auto;
`;

export const Controls = styled.div`
  margin-left: auto;
  display: flex;
`;

export const Control = styled.div`
  width: 35px;
  height: 35px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.style.border.default};
  cursor: pointer;
  pointer-events: ${({ disabled }) => disabled && 'none'};

  display: flex;
  justify-content: center;
  align-items: center;

  svg path {
    fill: ${({ theme, disabled }) =>
      disabled ? theme.palette.lightGrey1 : theme.style.text.normal};
  }

  &:first-of-type {
    border-radius: 3px 0 0 3px;
    border-right: none;
  }

  &:last-of-type {
    border-radius: 0 3px 3px 0;
  }
`;

export const ContentWrapper = styled.div`
  // flex: 1;
  overflow-x: hidden;
`;

export const Content = styled.div`
  position: relative;
  float: left;
  width: fit-content;
  height: fit-content;
  display: flex;
  transition: left 0.5s;
`;

export const CardWrapper = styled.div`
  padding-right: ${({ margin }) => margin}px;

  &:last-of-type {
    padding-right: 0;
  }
`;
