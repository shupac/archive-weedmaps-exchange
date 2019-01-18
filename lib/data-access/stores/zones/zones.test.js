import mockZones from 'lib/mocks/zones';
import Zones from './';

function setup(mockResponse) {
  const mockClient = {
    fetch: jest.fn().mockResolvedValue(mockResponse),
  };
  const zones = Zones.create({}, { client: mockClient });
  return { zones, mockClient };
}

describe('Zones store', () => {
  it('can fetch zones data', async () => {
    const { zones, mockClient } = setup({
      data: mockZones,
    });
    await zones.fetchZones();
    expect(mockClient.fetch).toHaveBeenCalledWith('/seller/zones');
    expect(zones.zones.length).toBe(mockZones.length);
  });
});
