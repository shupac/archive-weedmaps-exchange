// @flow
import styled from 'styled-components';
import { Flex, Box } from '@ghostgroup/grid-styled';
import Map from 'components/atoms/map';
import TextInput from 'components/atoms/forms/text-input';
import { rem } from 'polished';
import theme from 'lib/styles/theme';
import Close from 'components/atoms/icons/close';

export const ZONE_LIST_HEIGHT_OFFSET = 148;

export const Container = styled(Flex)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const ZoneListCta = styled.div`
  padding: ${rem(16)};
  font-size: ${rem(14)};
  color: ${theme.palette.darkBlue1};
`;

export const ZoneFormHeader = styled(Box)`
  background: white;
`;

export const FormControl = styled.div`
  margin-bottom: ${rem(16)};

  label {
    display: block;
    color: ${theme.colors.gullGray};
    font-size: ${rem(14)};
    margin-bottom: ${rem(4)};
  }
`;

export const ZoneRegionListDelete = styled(Close).attrs({
  fill: theme.palette.darkGrey2,
  size: rem(14),
})``;

export const ZoneRegionListItem = styled.li`
  border-bottom: 1px solid ${theme.palette.lightGrey1};
  padding: ${rem(16)} 0;
  font-size: ${rem(14)};
  color: ${theme.colors.oxfordBlue};
  position: relative;

  :first-child {
    padding-top: 0;
  }

  button {
    position: absolute;
    right: 0;
    padding: 0;
  }
`;

export const ClearButton = styled.button`
  background: transparent;
  border: none;
`;

export const ZoneRegionList = styled.ul`
  padding: 0 ${rem(24)};
  list-style: none;
  flex-grow: 1;
  overflow-y: auto;
`;

export const ActionContainer = styled(Box)`
  position: relative;
  box-shadow: 3px 0 3px 0px ${theme.colors.shadow.light};
  z-index: 1;
  overflow-x: hidden;
`;

export const NewZoneFooter = styled(Flex)`
  padding: ${rem(24)} ${rem(23)};
  width: 100%;
  button {
    max-width: 48%;
  }
`;

export const ZoneListContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  transition: all 250ms ease-in-out;

  &.zone-list-enter {
    opacity: 0.1;
    transform: translateX(100%);
  }

  &.zone-list-active,
  &.zone-list-exit {
    opacity: 1;
    transform: translateX(100%);
  }

  &.zone-list-active {
    opacity: 0.1;
    transform: translateX(0%);
  }
`;

export const NewZoneContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  transition: all 150ms ease-in-out;
  display: flex;
  flex-direction: column;
  background: white;

  &.new-zone-enter {
    opacity: 0.01;
    transform: translateX(-100%);
  }

  &.new-zone-active,
  &.new-zone-exit {
    opacity: 1;
    transform: translateX(0%);
  }

  &.new-zone-exit-active,
  &.new-zone-active {
    opacity: 0.01;
    transform: translateX(-100%);
  }
`;

export const NewZoneHeader = styled.h1`
  font-size: ${rem(22)};
  border-bottom: ${rem(1)} solid ${theme.palette.lightGrey1};
  padding-bottom: ${rem(9)};
  color: ${theme.colors.oxfordBlue};
  margin-bottom: ${rem(24)};
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

export const StyledTextInput = styled(TextInput)`
  font-weight: 400;
`;
