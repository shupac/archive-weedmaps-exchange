import { getSnapshot } from 'mobx-state-tree';
import { mockResponse } from 'lib/mocks/search-results';
import CatalogStore, { regionId } from './';

function setup() {
  return {
    mockFetchClient: {
      fetch: jest.fn().mockReturnValue(mockResponse),
    },
    mockCatalogStore: {
      departments: [
        {
          id: '1234',
          name: 'Indica',
          position: 1,
          iconImageUrl:
            'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/icons/concentrates.svg',
          avatarImageUrl:
            'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/images/concentrates.png',
        },
      ],
      setProductDetailData: jest.fn(),
    },
  };
}

describe('Catalog Store', () => {
  it('can fetch data from products endpoint', async () => {
    const { mockFetchClient } = setup();
    const catalogStore = CatalogStore.create({}, { client: mockFetchClient });
    await catalogStore.searchCatalog('indica');
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(
      `/buyer/regions/${regionId}/products?query=indica`,
    );
    expect(getSnapshot(catalogStore.searchResultsData)).toMatchSnapshot();
  });
});
