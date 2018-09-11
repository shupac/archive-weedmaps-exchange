import { getSnapshot } from 'mobx-state-tree';
import { mockCategories } from 'lib/mocks/category-card';
import CategoryStore from './';

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
    },
  };
}

describe('Category Store', () => {
  it('can create an instance of a model', () => {
    const { mockCategoryStore } = setup();
    const departments = CategoryStore.create(mockCategoryStore);
    expect(getSnapshot(departments)).toMatchSnapshot();
  });
  it('can fetch data from categories endpoint', async () => {
    const { mockFetchClient } = setup();
    const categoryStore = CategoryStore.create({}, { client: mockFetchClient });
    await categoryStore.getDepartments('1234');
    expect(mockFetchClient.fetch).toHaveBeenCalledWith(
      'buyer/regions/1234/departments?include=avatar_image,icon_image',
    );
    expect(categoryStore.departments).toEqual([
      {
        avatarImageUrl:
          'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/images/concentrates.png',
        iconImageUrl:
          'https://wm-exchange-assets-acceptance.s3.amazonaws.com/categories/icons/concentrates.svg',
        id: '81ac71b1-1c0c-490e-ad8a-062a6a1ae9a6',
        name: 'Concentrates',
        position: 1,
      },
    ]);
  });
});
