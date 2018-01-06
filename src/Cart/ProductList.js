// @flow

import React, { Component } from 'react';
import type Product from '../data/products';
import ProductItem from './ProductItem';
import ProductModal from './ProductModal';
import { Table } from 'react-bootstrap';
import { withSubscriptions } from '../react-channel';

type Props = {
  products: Array<Product>,
  selected: ?Product
};

class ProductList extends Component {
  props: Props;

  isSelected(product: Product): boolean {
    const { selected } = this.props;
    return selected && selected.name === product.name;
  }

  render() {
    const { products, selected } = this.props;

    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => <ProductItem key={i} selected={this.isSelected(product)} data={product} />)}
          </tbody>
        </Table>
        {selected && <ProductModal product={selected} />}
      </div>
    );
  }
}

export default withSubscriptions({
  'ProductItem/selected': product => {
    return {
      selected: product
    };
  },
  'ProductModal/close': product => {
    return {
      selected: null
    };
  }
})(ProductList);
