import Product from '../../models/product';
import { PRODUCT_URL, UPDATE_PRODUCT_URL } from '../../services/index';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = (payload) => async dispatch => {
  try {
    // calling API
    const res = await fetch(PRODUCT_URL);


    // catch err
    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    // convert response
    const resData = await res.json();

    // processing response
    const loadedProducts = [];
    for (const key in resData) {
      // id, owner, title, description, price, imageUrl
      loadedProducts.push(
        new Product(
          key,
          'u1',
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
      );
    }

    // store into redux
    return dispatch({ type: SET_PRODUCTS, payload: loadedProducts });
  } catch (err) {
    // send to custom analytics server
    console.log(err);
    throw err;
  }
}


export const deleteProduct = (payload) => async dispatch => {
  try {
    // calling API
    const res = await fetch(UPDATE_PRODUCT_URL(payload.id), {
      method: 'DELETE',
    });


    // catch err
    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    // store into redux
    return dispatch({ type: DELETE_PRODUCT, payload });
  } catch (err) {
    // send to custom analytics server
    console.log(err);
    throw err;
  }
}



export const createProduct = (payload) => async dispatch => {
  // any async code you want!
  const res = await fetch(PRODUCT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...payload,
    })
  });

  // catch err
  if (!res.ok) {
    throw new Error('Something went wrong!')
  }

  const resData = await res.json();

  return dispatch({ type: CREATE_PRODUCT, payload: { id: resData.name, ...payload } });
};

export const updateProduct = (payload) => async dispatch => {
  try {
    // calling API
    const res = await fetch(UPDATE_PRODUCT_URL(payload.id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // title, description, imageUrl, price
        title: payload.title,
        description: payload.description,
        imageUrl: payload.imageUrl
      })
    });

    // catch err
    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    // store into redux
    return dispatch({ type: UPDATE_PRODUCT, payload });
  } catch (err) {
    // send to custom analytics server
    console.log(err);
    throw err;
  }
}
