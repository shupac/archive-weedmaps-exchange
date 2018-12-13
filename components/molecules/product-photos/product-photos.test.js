import React from 'react';
import { shallow } from 'enzyme';
import { productPhotos } from 'lib/mocks/product-photos';
import { mockProductDetails } from 'lib/mocks/product-details';
import PaginatedModal from 'components/molecules/paginated-modal';
import MiniPhotos from './mini-photos';
import FeaturedPhoto from './featured-photo';
import { ProductPhotos } from './';

const props = {
  store: {
    buyerProducts: {
      featuredProductPhoto: productPhotos[0],
      productDetails: mockProductDetails,
      setFeaturedProductPhoto: jest.fn(),
    },
    uiStore: {
      openModal: jest.fn(),
      activeModal: '',
    },
  },
  productPhotos,
};

function setup() {
  const component = <ProductPhotos {...props} />;
  const wrapper = shallow(<ProductPhotos {...props} />);
  const instance = wrapper.instance();
  return { wrapper, component, instance };
}

describe('Product Photos', () => {
  it('should render the feature and mini photos', () => {
    const { wrapper } = setup();
    expect(wrapper.find(FeaturedPhoto).length).toEqual(1);
    expect(wrapper.find(MiniPhotos).length).toEqual(3);
  });

  it('should check if mini photo isFeatured is true', () => {
    const { wrapper } = setup();
    expect(
      wrapper
        .find(MiniPhotos)
        .at(0)
        .props().isFeatured,
    ).toEqual(true);
  });

  it('should check if mini photo isFeatured is false', () => {
    const { wrapper } = setup();
    expect(
      wrapper
        .find(MiniPhotos)
        .at(1)
        .props().isFeatured,
    ).toEqual(false);
  });

  it('should be able to changeFeaturePhoto  ', () => {
    const { wrapper, instance } = setup();
    const changeFeaturePhoto = jest.spyOn(instance, 'changeFeaturePhoto');
    const miniPhoto = wrapper.find(MiniPhotos).at(1);
    miniPhoto.simulate('click');
    expect(changeFeaturePhoto).toHaveBeenCalled();
  });

  it('should render the changeFeaturePhoto', () => {
    const { instance } = setup();
    const setLightBoxIndex = jest.spyOn(instance, 'setLightBoxIndex');
    instance.changeFeaturePhoto('1608ec15-013e-4a77-9cb9-27cc232a6640');
    expect(setLightBoxIndex).toHaveBeenCalled();
    expect(
      props.store.buyerProducts.setFeaturedProductPhoto,
    ).toHaveBeenCalled();
  });

  it('should render the PaginatedModal', () => {
    props.store.uiStore.activeModal = 'paginatedModal';
    const { wrapper } = setup();
    expect(wrapper.find(PaginatedModal).exists()).toBe(true);
  });

  it('should set lightbox index', () => {
    const { instance } = setup();
    instance.setLightBoxIndex(1);
    expect(instance.lightBoxIndex).toEqual(1);
  });

  it('should handle onPrevItem', () => {
    const { instance } = setup();
    instance.setLightBoxIndex(2);
    instance.onPrevItem();
    expect(instance.lightBoxIndex).toEqual(1);
  });

  it('should handle onPrevItem when at the first item', () => {
    const { instance } = setup();
    instance.setLightBoxIndex(0);
    instance.onPrevItem();
    expect(instance.lightBoxIndex).toEqual(2);
  });

  it('should handle opening the modal', () => {
    const { instance } = setup();
    instance.onOpenLightbox();
    expect(props.store.uiStore.openModal).toHaveBeenCalledWith(
      'paginatedModal',
    );
  });

  it('should handle onNextItem', () => {
    const { instance } = setup();
    instance.setLightBoxIndex(1);
    instance.onNextItem();
    expect(instance.lightBoxIndex).toEqual(2);
  });
});
