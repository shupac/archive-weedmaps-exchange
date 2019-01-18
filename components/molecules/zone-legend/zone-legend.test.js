import { shallow } from 'enzyme';
import findByTestId from 'lib/jest/find-by-test-id';
import mockZones from 'mocks/zones';
import Zones from 'lib/data-access/stores/zones';
import { ZoneLegend } from './';

function setup() {
  const mockClient = { fetch: jest.fn() };
  const mockSdk = {
    fetch: jest.fn().mockResolvedValue(),
  };
  const mockStore = {
    zones: Zones.create(
      {
        zones: mockZones,
        regionsWithGeometry: {},
      },
      { client: mockClient, wmSdk: mockSdk },
    ),
  };
  const wrapper = shallow(<ZoneLegend store={mockStore} />);
  const instance = wrapper.instance();
  return { wrapper, instance, mockStore };
}

describe('Zone Legend', () => {
  beforeEach(() => {
    const { mockStore } = setup();
    jest.spyOn(mockStore.zones, 'fetchZones').mockResolvedValue(mockZones);
  });
  it('should load zone data on mount ', () => {
    const { mockStore } = setup();
    jest.spyOn(mockStore.zones, 'fetchZones').mockResolvedValue(true);
    shallow(<ZoneLegend store={mockStore} />);

    expect(mockStore.zones.fetchZones).toHaveBeenCalled();
  });

  it('should render zone cards ', () => {
    const { wrapper } = setup();
    const zoneCard = findByTestId(wrapper, 'zone-card');
    expect(zoneCard.length).toBe(3);
  });

  it('should render a Map if zones available ', () => {
    const { wrapper } = setup();
    const map = findByTestId(wrapper, 'map-legend');
    expect(map.exists()).toBe(true);
  });
});

describe('Zone Legend when there are no zones', () => {
  let wrapper;
  let mockStore;
  beforeEach(() => {
    mockStore = {
      zones: Zones.create({ zones: [] }),
    };
    wrapper = shallow(<ZoneLegend store={mockStore} />);
  });
  it('should show the empty state', () => {
    expect(findByTestId(wrapper, 'no-zones').length).toBe(1);
  });
});
