import PRODUCT from '../../data/dummy-data';
import Product from '../../models/product';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from '../actions/products';

const initialState = {
  availableProducts: PRODUCT,
  userProducts: PRODUCT.filter((prod) => prod.ownerId === 'u1'),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DELETE_PRODUCT:
      const { id } = payload;
      return {
        ...state,
        userProducts: state.userProducts.filter((prod) => prod.id !== id),
        availableProducts: state.availableProducts.filter((prod) => prod.id !== id),
      };
    case CREATE_PRODUCT:
      console.log(payload);
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        payload.title,
        payload.imageUrl,
        payload.description,
        payload.price,
      );
      console.log(newProduct);

      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct],
      };
    case UPDATE_PRODUCT:
      const prodIndex = state.userProducts.findIndex(
        (prod) => prod.id === payload.id,
      );
      const updatedProduct = new Product(
        payload.id,
        state.userProducts[prodIndex].ownerId,
        payload.title,
        payload.imageUrl,
        payload.description,
        state.userProducts[prodIndex].price,
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[prodIndex] = updatedProduct;

      const availableProductIndex = state.userProducts.findIndex(
        (prod) => prod.id === payload.id,
      );

      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        userProducts: updatedUserProducts,
        availableProducts: updatedAvailableProducts,
      };
    default:
      return state;
  }
};
