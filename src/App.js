// @flow

import React, { Component } from 'react';
import type Product from './data/products';
import { fetchProducts } from './data/products';
import { Grid, Row, Col, Alert, Jumbotron } from 'react-bootstrap';
import Cart from './Cart';

type Props = {
  title: string
};

type State = {
  productList: Array<Product>,
  status: 'initial' | 'loading' | 'success' | 'failure',
  error: ?string
};

class App extends Component {
  props: Props;
  state: State;

  constructor(props) {
    super(props);

    this.state = {
      productList: [],
      status: 'initial',
      error: null
    };
  }

  componentDidMount() {
    this.setState({ status: 'loading' });

    fetchProducts()
      .then(products =>
        this.setState({
          productList: products,
          status: 'success'
        })
      )
      .catch(err =>
        this.setState({
          status: 'failure',
          error: err
        })
      );
  }

  render() {
    const { status, error, productList } = this.state;
    const { title } = this.props;

    return (
      <Grid>
        <Row className="show-grid">
          <Col md={12}>
            <Jumbotron>
              <h1>{title}</h1>
              <p>Sample react application to test the react-channel pattern.</p>
            </Jumbotron>
          </Col>

          <Col md={12}>
            {status === 'success' && <Cart products={productList} />}
            {status === 'loading' && <div>Loading...</div>}
            {status === 'error' && <Alert bsStyle="danger">Error loading your Cart: {error}</Alert>}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
