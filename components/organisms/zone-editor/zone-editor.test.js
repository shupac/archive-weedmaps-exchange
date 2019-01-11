// @flow
import { shallow } from 'enzyme';
import mockZones from 'mocks/zones';
import findByTestId from 'lib/jest/find-by-test-id';
import { ZoneEditor } from './';

describe('zone editor', () => {
  it('should fetch zones on mount', () => {
    const mockStore = {
      sellerSettings: {
        // $FlowFixMe
        fetchZones: jest.fn().mockResolvedValue(mockZones),
        zones: mockZones,
      },
    };
    shallow(<ZoneEditor store={mockStore} />);
    expect(mockStore.sellerSettings.fetchZones).toHaveBeenCalled();
  });

  describe('when there are zones', () => {
    let wrapper;
    let mockStore;
    beforeEach(() => {
      mockStore = {
        sellerSettings: {
          // $FlowFixMe
          fetchZones: jest.fn().mockResolvedValue(mockZones),
          zones: mockZones,
        },
      };
      wrapper = shallow(<ZoneEditor store={mockStore} />);
    });

    it('clicking the add zone button will add a zone', () => {
      const zoneButton = findByTestId(wrapper, 'add-zone');
      jest.spyOn(console, 'log');
      zoneButton.simulate('click');
      // TODO replace with real side effect in next PR
      expect(console.log).toHaveBeenCalledWith('Creating Zone');
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
      // TODO replace with real side effect in next PR
      jest.spyOn(console, 'log');
      zoneCard.props().onEdit({ id: 1 });
      expect(console.log).toHaveBeenCalledWith({ id: 1 });
    });

    it('should call the delete handler when clicking delete', () => {
      const zoneCard = findByTestId(wrapper, 'zone-card').at(1);
      // TODO replace with real side effect in next PR
      jest.spyOn(console, 'log');
      zoneCard.props().onDelete({ id: 2 });
      expect(console.log).toHaveBeenCalledWith({ id: 2 });
    });
  });

  describe('when there are no zones', () => {
    let wrapper;
    let mockStore;
    beforeEach(() => {
      mockStore = {
        sellerSettings: {
          // $FlowFixMe
          fetchZones: jest.fn().mockResolvedValue(mockZones),
          zones: [],
        },
      };
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
