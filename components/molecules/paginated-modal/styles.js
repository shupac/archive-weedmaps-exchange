import styled from 'styled-components';
import { rem } from 'polished';

const PagingWrapper = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  .rightArrow,
  .leftArrow {
    display: block;
    position: absolute;
    width: ${rem(50)};
    height: ${rem(50)};
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

export default PagingWrapper;
