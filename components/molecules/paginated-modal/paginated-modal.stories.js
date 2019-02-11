import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box } from '@ghostgroup/grid-styled';
import { observer } from 'mobx-react';
import centered from '@storybook/addon-centered';
import FeaturedPhoto from 'components/molecules/product-photos';
import UiStore from 'lib/data-access/stores/ui';
import PaginatedModal from './';

const photos = [
  {
    id: 143348,
    title: '$20 Gram Purple Alien Shatter',
    largeUrl:
      'https://images.weedmaps.com/deliveries/000/028/056/avatar/medium_pad/1510581744-1507271994-COVER_3.JPG?development=1',
  },
  {
    id: 143349,
    title: '15grams of any wax for $400',
    largeUrl:
      'https://images.weedmaps.com/deliveries/000/012/395/avatar/square_fill/1510581077-image.png',
  },
  {
    id: 143350,
    title: '$90oz NuggsONLY or 4g wax for$90',
    largeUrl:
      'https://images.weedmaps.com/deliveries/000/030/625/avatar/square_fill/1514684771-Screenshot_20171209-172636.png',
  },
];

const uiStore = UiStore.create();

class ModalWrapper extends Component {
  state = {
    index: 0,
  };

  onOpen = index => {
    this.setState({ index });
    uiStore.openModal('paginatedModal');
  };

  onNextItem = () => {
    this.setState({ index: (this.state.index + 1) % photos.length });
  };

  onPrevItem = () => {
    this.setState({
      index: (this.state.index + photos.length - 1) % photos.length,
    });
  };

  render() {
    return (
      <div>
        {photos.map((photo, index) => (
          <Box key={photo.id} px={12} py={12} width={[1]}>
            <button onClick={() => this.onOpen(index)}>
              <div photo={{ ...photo }} key={photo.id}>
                Photo #{photo.id}
              </div>
            </button>
          </Box>
        ))}
        {uiStore.activeModal === 'paginatedModal' && (
          <PaginatedModal
            store={{ uiStore }}
            onNextItem={() => this.onNextItem()}
            onPrevItem={() => this.onPrevItem()}
          >
            <FeaturedPhoto featuredPhoto={photos[this.state.index]} />
          </PaginatedModal>
        )}
      </div>
    );
  }
}

const ModalWrapperObserved = observer(ModalWrapper);

export default storiesOf('PaginatedModal', module)
  .addDecorator(centered)
  .add('default', () => <ModalWrapperObserved />);
