import styled from 'styled-components';
import { rem } from 'polished';
import Map from 'components/atoms/map';

export const LegendContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;
export const ZoneList = styled.div``;

export const NoZones = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  > p {
    font-size: ${rem(14)};
  }
`;

export const SquareMap = styled(Map)`
  width: 439px;
  height: 340px;
  pointer-events: none;

  .mapboxgl-ctrl-attrib-inner,
  .mapboxgl-ctrl-logo {
    opacity: 0.1;
  }
`;

export const MapWrapper = styled.div`
  padding: 0 24px;
`;
