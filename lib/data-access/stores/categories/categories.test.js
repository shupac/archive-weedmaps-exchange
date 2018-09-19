import { getSnapshot } from 'mobx-state-tree';
import { mockCategories, mockCategoryProducts } from 'lib/mocks/category-card';
import CategoryStore, { regionId } from './';

function setup() {
  return {
    mockFetchClient: {
      fetch: jest.fn().mockReturnValue(mockCategories),
    },
    mockCategoryStore: {
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
      carouselProducts: mockCategoryProducts,
    },
  };
}

describe('Category Store', () => {
  it('can fetch data from categories endpoint', async () => {
    const { mockFetchClient } = setup();
    const categoryStore = CategoryStore.create({}, { client: mockFetchClient });
    await categoryStore.getDepartments();
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(
      `/buyer/regions/${regionId}/departments?include=avatar_image,icon_image`,
    );
    expect(getSnapshot(categoryStore.departments)).toMatchSnapshot();
  });
});
