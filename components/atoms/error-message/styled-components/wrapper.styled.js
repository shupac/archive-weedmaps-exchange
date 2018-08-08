import styled from 'styled-components';
import { rem } from 'polished';

const Wrapper = styled.div`
  padding: 0 15px;

  h1 {
    display: flex;
    justify-content: center;
    font-size: ${rem(42)};
    margin: 0;
    padding-top: 64px;
    padding-bottom: 24px;
  }

  div {
    font-weight: 500;
    font-size: ${rem(20)};
    text-align: center;
  }
`;

export default Wrapper;
