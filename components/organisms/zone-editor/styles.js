import styled from 'styled-components';
import { Flex, Box } from '@ghostgroup/grid-styled';
import Map from 'components/atoms/map';
import rem from 'polished/lib/helpers/rem';
import theme from 'lib/styles/theme';

export const ZONE_LIST_HEIGHT_OFFSET = 148;

export const Container = styled(Flex)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const MapContainer = styled(Box)`
  background: rgba(33, 33, 33, 0.3);
`;

export const FullWidthMap = styled(Map)`
  width: 100%;
  height: 100%;
`;

export const ZoneCount = styled.span`
  font-size: ${rem(12)};
  font-weight: 600;
  background: ${theme.colors.divider};
  color: ${theme.colors.oxfordBlue};
  display: block;
  padding: ${rem(9.5)} 1rem;
  text-transform: uppercase;
`;

export const ZoneList = styled.div`
  overflow-y: auto;
  // offset for the search header and zone count
  height: calc(100% - ${rem(ZONE_LIST_HEIGHT_OFFSET)});
`;

export const NoZones = styled(Flex)`
  padding: ${rem(36)} ${rem(9.5)};
  color: ${theme.colors.oxfordBlue};

  h3 {
    font-size: ${rem(20)};
    font-weight: 600;
    margin-bottom: ${rem(16)};
  }

  p {
    font-size: ${rem(14)};
  }
`;
