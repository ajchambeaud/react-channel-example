// @flow

export type Product = {
  name: string,
  price: number,
  quantity: number
};

const products: Array<Product> = [
  {
    name: 'Foo',
    price: 12.5,
    quantity: 1
  },
  {
    name: 'Bar',
    price: 10,
    quantity: 1
  },
  {
    name: 'Baz',
    price: 20,
    quantity: 1
  }
];

export const fetchProducts = () => Promise.resolve(products);
