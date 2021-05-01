export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = (payload) => {
  return { type: DELETE_PRODUCT, payload };
};
export const createProduct = (payload) => {
  return { type: CREATE_PRODUCT, payload };
};
export const updateProduct = (payload) => {
  return { type: UPDATE_PRODUCT, payload };
};
