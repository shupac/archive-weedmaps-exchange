// @flow
import React, { Component, Fragment } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import find from 'lodash.find';
import { type StoreType } from 'lib/types/store';
import type { ImageType } from 'lib/data-access/models/image';
import PaginatedModal from 'components/molecules/paginated-modal';
import {
  ProductPhotosWrapper,
  MiniPhotoWrapper,
  LightboxPhotoWrapper,
} from './styles';
import MiniPhotos from './mini-photos';
import FeaturedPhoto from './featured-photo';

type Props = {
  store: StoreType,
  productPhotos: ImageType[],
  featuredProduct: ImageType,
  changeFeaturePhoto: (id: string) => void,
};

type State = {
  lightBoxIndex: number,
};

export class ProductPhotos extends Component<Props, State> {
  @observable
  lightBoxIndex = 0;

  @action
  onNextItem = () => {
    const { productPhotos } = this.props;
    this.lightBoxIndex = (this.lightBoxIndex + 1) % productPhotos.length;
  };

  @action
  onPrevItem = () => {
    const { productPhotos } = this.props;
    this.lightBoxIndex = (this.lightBoxIndex - 1) % productPhotos.length;
  };

  @action
  setLightBoxIndex = (idx: number) => {
    this.lightBoxIndex = idx;
  };

  changeFeaturePhoto = (photoId: string) => {
    const { buyerProducts } = this.props.store;
    const { productDetails } = buyerProducts;

    const clickedPhoto = find(productDetails.galleryImages, {
      id: photoId,
    });

    const featuredIndex = productDetails.galleryImages.findIndex(
      photo => photo.id === photoId,
    );

    this.setLightBoxIndex(featuredIndex);
    buyerProducts.setFeaturedProductPhoto(clickedPhoto);
  };

  onOpenLightbox = () => {
    const { uiStore } = this.props.store;
    uiStore.openModal('paginatedModal');
  };

  render() {
    const { productPhotos, store } = this.props;
    const { buyerProducts, uiStore } = store;
    const { featuredProductPhoto } = buyerProducts;

    return (
      <Fragment>
        <ProductPhotosWrapper>
          <FeaturedPhoto
            featuredPhoto={featuredProductPhoto}
            modalHandler={this.onOpenLightbox}
          />
          <MiniPhotoWrapper>
            {productPhotos &&
              productPhotos.map(photo => (
                <MiniPhotos
                  key={photo.id}
                  photo={photo}
                  onClick={() => this.changeFeaturePhoto(photo.id)}
                  isFeatured={
                    featuredProductPhoto && photo.id === featuredProductPhoto.id
                  }
                />
              ))}
          </MiniPhotoWrapper>
        </ProductPhotosWrapper>
        {uiStore.activeModal === 'paginatedModal' && (
          <PaginatedModal
            onNextItem={this.onNextItem}
            onPrevItem={this.onPrevItem}
          >
            <LightboxPhotoWrapper
              style={{
                backgroundImage: `url(${
                  productPhotos[this.lightBoxIndex].largeUrl
                })`,
              }}
            />
          </PaginatedModal>
        )}
      </Fragment>
    );
  }
}

export default observer(ProductPhotos);
