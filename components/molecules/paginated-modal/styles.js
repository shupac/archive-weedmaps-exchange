import styled from 'styled-components';

export const ContentWrapper = styled.div``;

export const PagingWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  transform: translateY(-50%);
  top: 50%;
  display: flex;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
  }

  .rightArrow,
  .leftArrow {
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .rightArrow {
    right: -56px;
  }
  .leftArrow {
    left: -56px;
  }
`;

PagingWrapper.DisplayName = 'PagingWrapper';
