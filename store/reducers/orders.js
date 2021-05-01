import Order from '../../models/order';

import { ADD_ORDER } from '../actions/orders';

const orders = [
  {
    id: 'Fri Apr 30 2021 10:48:24 GMT+0700 (Indochina Time)',
    items: [
      {
        id: 'p3',
        title: 'Coffee Mug',
        price: 8.99,
        quantity: 1,
        sum: 8.99,
      },
      {
        id: 'p2',
        title: 'Blue Carpet',
        price: 99.99,
        quantity: 4,
        sum: 399.96,
      },
      {
        id: 'p5',
        title: 'PowerBook',
        price: 2299.99,
        quantity: 2,
        sum: 4599.98,
      },
      {
        id: 'p4',
        title: 'The Book - Limited Edition',
        price: 15.99,
        quantity: 3,
        sum: 47.97,
      },
    ],
    totalAmount: 5056.9,
    date: '2021-04-30T03:48:24.590Z',
  },
];

const initialState = {
  // orders,
  orders: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ORDER:
      const { items, totalAmount } = payload;
      const newOrder = new Order(
        new Date().toString(),
        items,
        totalAmount,
        new Date(),
      );
      return { ...state, orders: [...state.orders, newOrder] };
    default:
      return state;
  }
};
