// @flow

import React, { Component } from 'react';
import type Product from '../data/products';
import { Modal, Button } from 'react-bootstrap';
import { emit } from '../react-channel';

type Props = {
  product: Product
};

class ProductModal extends Component {
  props: Props;

  render() {
    const { product } = this.props;

    return (
      <Modal show={true} onHide={() => emit('ProductModal/close')}>
        <Modal.Header closeButton>
          <Modal.Title>Product Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>{product.name}</h2>
          <div>Price: {product.price}</div>
          <div>Quantity: {product.quantity}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => emit('ProductModal/close')}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ProductModal;
