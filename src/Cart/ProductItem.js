// @flow

import React, { Component } from 'react';
import type Product from '../data/products';
import { Button } from 'react-bootstrap';
import { emit } from '../react-channel';

type Props = {
  data: Product,
  selected: boolean
};

class ProductItem extends Component {
  props: Props;

  render() {
    const { data } = this.props;

    return (
      <tr>
        <td>{data.name}</td>
        <td>{data.price}</td>
        <td>{data.quantity}</td>
        <td>
          <Button bsStyle="primary" bsSize="small" onClick={() => emit('ProductItem/selected', data)}>
            Open
          </Button>
        </td>
      </tr>
    );
  }
}

export default ProductItem;
