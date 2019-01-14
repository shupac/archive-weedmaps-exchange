// @flow
import { shallow } from 'enzyme';
import mockZones from 'mocks/zones';
import findByTestId from 'lib/jest/find-by-test-id';
import Zones from 'lib/data-access/stores/zones';
import { ZoneEditor } from './';

describe('zone editor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('on mounting', () => {
    let mockStore;
    let mockClient;
    let mockSdk;

    beforeEach(() => {
      mockClient = { fetch: jest.fn() };
      mockSdk = {
        // $FlowFixMe
        fetch: jest.fn().mockResolvedValue(),
      };
      mockStore = {
        zones: Zones.create(
          {
            zones: mockZones,
            regionsWithGeometry: {},
          },
          { client: mockClient, wmSdk: mockSdk },
        ),
      };
      // TODO mock fetchRegionsForZones for now
      jest
        .spyOn(mockStore.zones, 'fetchRegionsForZones')
        // $FlowFixMe
        .mockResolvedValue(true);
      // TODO mock fetchRegionInBounds for now
      jest
        .spyOn(mockStore.zones, 'fetchRegionsInBounds')
        // $FlowFixMe
        .mockResolvedValue(true);
      // $FlowFixMe
      jest.spyOn(mockStore.zones, 'fetchZones').mockResolvedValue(mockZones);
    });

    it('should fetch zones', () => {
      // $FlowFixMe
      jest.spyOn(mockStore.zones, 'fetchZones').mockResolvedValue(true);
      shallow(<ZoneEditor store={mockStore} />);
      expect(mockStore.zones.fetchZones).toHaveBeenCalled();
    });
  });

  describe('when there are zones', () => {
    let wrapper;
    let mockStore;
    let mockClient;
    let mockSdk;

    beforeEach(() => {
      mockClient = { fetch: jest.fn() };
      mockSdk = {
        // $FlowFixMe
        fetch: jest.fn().mockResolvedValue(),
      };
      mockStore = {
        zones: Zones.create(
          {
            zones: mockZones,
            regionsWithGeometry: {},
          },
          { client: mockClient, wmSdk: mockSdk },
        ),
      };
      // TODO mock fetchRegionsForZones for now
      jest
        .spyOn(mockStore.zones, 'fetchRegionsForZones')
        // $FlowFixMe
        .mockResolvedValue(true);
      // TODO mock fetchRegionInBounds for now
      jest
        .spyOn(mockStore.zones, 'fetchRegionsInBounds')
        // $FlowFixMe
        .mockResolvedValue(true);
      // $FlowFixMe
      jest.spyOn(mockStore.zones, 'fetchZones').mockResolvedValue(mockZones);
      wrapper = shallow(<ZoneEditor store={mockStore} />);
    });

    it('clicking the add zone button will add a zone', done => {
      const zoneButton = findByTestId(wrapper, 'add-zone');
      jest.spyOn(mockStore.zones, 'addZone');
      zoneButton.simulate('click');
      setTimeout(() => {
        expect(mockStore.zones.addZone).toHaveBeenCalledWith({
          color: '#fff',
          id: '',
          name: '',
          regions: [],
        });
        done();
      }, 550);
    });

    it('should show the zones count', () => {
      const zoneCount = findByTestId(wrapper, 'zone-count');
      expect(zoneCount.length).toBe(1);
      expect(zoneCount.html()).toContain('3 Zones');
    });

    it('should filter zones with the search box', () => {
      const searchBox = findByTestId(wrapper, 'search-box');
      searchBox.props().onHandleSearch('SoCal');
      expect(findByTestId(wrapper, 'zone-card').length).toBe(1);
    });

    it('should render the region names', () => {
      expect(
        findByTestId(wrapper, 'zone-card')
          .at(1)
          .html(),
      ).toContain('South OC');
    });

    it('should render the zone name', () => {
      expect(
        findByTestId(wrapper, 'zone-card')
          .at(1)
          .html(),
      ).toContain('SoCal');
    });

    it('should render the zone color', () => {
      expect(
        findByTestId(wrapper, 'zone-card')
          .at(1)
          .html(),
      ).toContain('#F5A623');
    });

    it('should call the edit handler when clicking edit', () => {
      const zoneCard = findByTestId(wrapper, 'zone-card').at(1);
      zoneCard.props().onEdit({ id: 1, regions: [] });
      expect(wrapper.instance().selectedZone).toEqual({ id: 1, regions: [] });
    });

    it('should call the delete handler when clicking delete', () => {
      const zoneCard = findByTestId(wrapper, 'zone-card').at(1);
      // TODO replace with real side effect in next PR
      // $FlowFixMe
      jest.spyOn(mockStore.zones, 'deleteZone').mockResolvedValue(true);
      zoneCard.props().onDelete({ id: 2, regions: [] });
      expect(mockStore.zones.deleteZone).toHaveBeenCalledWith({
        id: 2,
        regions: [],
      });
    });
  });

  describe('when there are no zones', () => {
    let wrapper;
    let mockStore;

    beforeEach(() => {
      mockStore = {
        zones: Zones.create({ zones: [] }),
      };
      // TODO mock fetchRegionsForZones for now
      jest
        .spyOn(mockStore.zones, 'fetchRegionsForZones')
        // $FlowFixMe
        .mockResolvedValue(true);
      // TODO mock fetchRegionInBounds for now
      jest
        .spyOn(mockStore.zones, 'fetchRegionsInBounds')
        // $FlowFixMe
        .mockResolvedValue(true);
      // $FlowFixMe
      jest.spyOn(mockStore.zones, 'fetchZones').mockResolvedValue([]);
      wrapper = shallow(<ZoneEditor store={mockStore} />);
    });

    it('should show the empty state', () => {
      expect(findByTestId(wrapper, 'no-zones').length).toBe(1);
    });

    it('should show the button to add the first zone', () => {
      expect(findByTestId(wrapper, 'no-zones-add-zone').length).toBe(1);
    });
  });
});
