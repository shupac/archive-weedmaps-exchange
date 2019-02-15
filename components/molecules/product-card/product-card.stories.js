import { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import centered from '@storybook/addon-centered';
import { mockProducts } from 'lib/mocks/product-card';
import ProductCard from './';

type Props = {
  products: any,
};

class Wrapper extends Component<Props> {
  render() {
    const { products } = this.props;
    return (
      <div style={{ display: 'flex' }}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            brand={product.brand}
            name={product.name}
            imageUrl={product.img}
            category={product.category}
            priceRanges={product.priceRanges}
            outOfStock={product.outOfStock}
          />
        ))}
      </div>
    );
  }
}

export default storiesOf('ProductCard', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('Default', () => <Wrapper products={mockProducts} />);
