// @flow
import React, { Component, Fragment } from 'react';
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
import get from 'lodash.get';
import { type StoreType } from 'lib/types/store';
import type { ImageType } from 'lib/data-access/models/image';
import PaginatedModal from 'components/molecules/paginated-modal';
import {
  ProductPhotosWrapper,
  FeaturedPhotoWrapper,
  MiniPhotoWrapper,
  MiniPhoto,
  LightboxPhotoWrapper,
  Image,
} from './styles';

type Props = {
  store: StoreType,
  productPhotos: ImageType[],
};

type State = {
  featuredPhotoIndex: number,
};

export class ProductPhotos extends Component<Props, State> {
  @observable
  featuredPhotoIndex = 0;

  @computed
  get featuredPhoto(): ImageType {
    return this.props.productPhotos[this.featuredPhotoIndex];
  }

  @action
  onNextItem = () => {
    const { productPhotos } = this.props;
    this.featuredPhotoIndex =
      (this.featuredPhotoIndex + 1) % productPhotos.length;
  };

  @action
  onPrevItem = () => {
    const { productPhotos } = this.props;
    // Goto the end if we are at the first item
    if (this.featuredPhotoIndex === 0) {
      this.featuredPhotoIndex = productPhotos.length - 1;
    } else {
      this.featuredPhotoIndex -= 1;
    }
  };

  @action
  setFeaturedPhotoIndex = (index: number) => {
    this.featuredPhotoIndex = index;
  };

  onOpenLightbox = () => {
    const { uiStore } = this.props.store;
    uiStore.openModal('paginatedModal');
  };

  render() {
    const { productPhotos, store } = this.props;
    const { buyerProducts, uiStore } = store;

    const productName = get(buyerProducts, [
      'productDetailsData, product, name',
      '',
    ]);

    return (
      <Fragment>
        <ProductPhotosWrapper>
          <FeaturedPhotoWrapper>
            {this.featuredPhoto ? (
              <Image
                src={this.featuredPhoto.largeUrl}
                alt={productName}
                onClick={this.onOpenLightbox}
              />
            ) : (
              'No picture Available'
            )}
          </FeaturedPhotoWrapper>

          <MiniPhotoWrapper>
            {productPhotos &&
              productPhotos.slice(0, 6).map((photo, index) => (
                <MiniPhoto
                  key={photo.id}
                  onClick={() => this.setFeaturedPhotoIndex(index)}
                  isFeatured={this.featuredPhotoIndex === index}
                >
                  <Image src={photo.smallUrl} alt={productName} />
                </MiniPhoto>
              ))}
          </MiniPhotoWrapper>
        </ProductPhotosWrapper>
        {uiStore.activeModal === 'paginatedModal' && (
          <PaginatedModal
            onNextItem={this.onNextItem}
            onPrevItem={this.onPrevItem}
          >
            <LightboxPhotoWrapper>
              <Image
                src={get(
                  productPhotos,
                  [this.featuredPhotoIndex, 'largeUrl'],
                  '',
                )}
                alt={productName}
              />
            </LightboxPhotoWrapper>
          </PaginatedModal>
        )}
      </Fragment>
    );
  }
}

export default observer(ProductPhotos);
