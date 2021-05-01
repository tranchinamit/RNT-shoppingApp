import CartItem from '../../models/cart-item';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';

const cartItems = {
  p3: {
    price: 8.99,
    quantity: 1,
    sum: 8.99,
    title: 'Coffee Mug',
  },
  p2: {
    price: 99.99,
    quantity: 4,
    sum: 399.96,
    title: 'Blue Carpet',
  },
  p5: {
    price: 2299.99,
    quantity: 2,
    sum: 4599.98,
    title: 'PowerBook',
  },
  p4: {
    price: 15.99,
    quantity: 3,
    sum: 47.97,
    title: 'The Book - Limited Edition',
  },
};

const initialState = {
  // items: cartItems,
  // totalAmount: 5056.9,
  items: {},
  totalAmount: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      const { id, title, price } = payload;
      let updatedOrNewCartItem = {};
      if (state?.items[id]) {
        // already have the item in the cart, => update
        updatedOrNewCartItem = new CartItem(
          state.items[id].quantity + 1,
          price,
          title,
          state.items[id].sum + price,
        );
      } else {
        // do not exist in the cart, => add new
        updatedOrNewCartItem = new CartItem(1, price, title, price);
      }
      return {
        ...state,
        items: { ...state.items, [id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + price,
      };
    case REMOVE_FROM_CART:
      const prodId = payload.id;
      if (!prodId) return state;
      const selectedCartItem = state.items[prodId];
      const currentQty = selectedCartItem.quantity;
      let updatedOrDeleteCartItem = {};
      if (currentQty > 1) {
        // quantity > 1,  -1
        const tempObj = {
          ...selectedCartItem,
          quantity: selectedCartItem.quantity - 1,
          sum: selectedCartItem.sum - selectedCartItem.price,
        };
        updatedOrDeleteCartItem = { ...state.items, [prodId]: tempObj };
      } else {
        // quantity === 1, delete item
        updatedOrDeleteCartItem = { ...state.items };
        delete updatedOrDeleteCartItem[prodId];
      }
      console.log(updatedOrDeleteCartItem);
      return {
        ...state,
        items: updatedOrDeleteCartItem,
        totalAmount: state.totalAmount - selectedCartItem.price,
      };
    case ADD_ORDER:
      return initialState;
    default:
      return state;
  }
};
