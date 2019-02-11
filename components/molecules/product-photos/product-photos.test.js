import React from 'react';
import { shallow } from 'enzyme';
import { productPhotos } from 'lib/mocks/product-photos';
import { mockProductDetails } from 'lib/mocks/product-details';
import PaginatedModal from 'components/molecules/paginated-modal';
import { ProductPhotos } from './';

const props = {
  store: {
    buyerProducts: {
      productDetails: mockProductDetails,
    },
    uiStore: {
      openModal: jest.fn(),
      activeModal: '',
    },
  },
  productPhotos,
};

function setup() {
  const wrapper = shallow(<ProductPhotos {...props} />);
  const instance = wrapper.instance();
  return { wrapper, instance };
}

describe('Product Photos', () => {
  it('should render the feature and mini photos', () => {
    const { wrapper } = setup();
    expect(wrapper.find('FeaturedPhoto').length).toEqual(1);
    expect(wrapper.find('MiniPhoto').length).toEqual(3);
  });

  it('should check if mini photo isFeatured is true', () => {
    const { wrapper } = setup();
    expect(
      wrapper
        .find('MiniPhoto')
        .at(0)
        .props().isFeatured,
    ).toEqual(true);
  });

  it('should check if mini photo isFeatured is false', () => {
    const { wrapper } = setup();
    expect(
      wrapper
        .find('MiniPhoto')
        .at(1)
        .props().isFeatured,
    ).toEqual(false);
  });

  it('should be able to set featured photo  ', () => {
    const { wrapper, instance } = setup();
    expect(instance.featuredPhoto).toEqual(productPhotos[0]);
    wrapper
      .find('MiniPhoto')
      .at(1)
      .simulate('click');
    expect(instance.featuredPhoto).toEqual(productPhotos[1]);
  });

  it('should handle onPrevItem', () => {
    const { instance } = setup();
    instance.setFeaturedPhotoIndex(2);
    instance.onPrevItem();
    expect(instance.featuredPhotoIndex).toEqual(1);
  });

  it('should handle onPrevItem when at the first item', () => {
    const { instance } = setup();
    instance.setFeaturedPhotoIndex(0);
    instance.onPrevItem();
    expect(instance.featuredPhotoIndex).toEqual(2);
  });

  it('should handle onNextItem', () => {
    const { instance } = setup();
    instance.setFeaturedPhotoIndex(1);
    instance.onNextItem();
    expect(instance.featuredPhotoIndex).toEqual(2);
  });

  it('should handle opening the modal', () => {
    const { instance } = setup();
    instance.onOpenLightbox();
    expect(props.store.uiStore.openModal).toHaveBeenCalledWith(
      'paginatedModal',
    );
  });

  it('should render the PaginatedModal', () => {
    props.store.uiStore.activeModal = 'paginatedModal';
    const { wrapper } = setup();
    expect(wrapper.find(PaginatedModal).exists()).toBe(true);
  });

  it('should handle no photos', () => {
    const thisProps = {
      ...props,
      productPhotos: [],
    };
    const wrapper = shallow(<ProductPhotos {...thisProps} />);
    expect(wrapper.find('FeaturedPhoto').text()).toEqual(
      'No picture Available',
    );
  });
});
