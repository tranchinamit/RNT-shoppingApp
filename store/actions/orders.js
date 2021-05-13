import Order from '../../models/order';
import { CREATE_ORDER_URL, GET_ORDER_URL } from '../../services/index';

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  try {
    // calling API
    const res = await fetch(GET_ORDER_URL(userId));

    // catch err
    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    // convert response
    const resData = await res.json();

    // processing response
    const loadedOrders = [];
    for (const key in resData) {
      // id, owner, title, description, price, imageUrl
      loadedOrders.push(
        new Order(
          key,
          resData[key].items,
          resData[key].totalAmount,
          new Date(resData[key].date)
        )
      );
    }

    // store into redux
    return dispatch({ type: SET_ORDERS, payload: loadedOrders });
  } catch (err) {
    // send to custom analytics server
    console.log(err);
    throw err;
  }
}

export const addOrder = (payload) => async (dispatch, getState) => {
  const token = getState().auth.token;
  const userId = getState().auth.userId;
  try {
    const szDate = new Date();
    // calling API
    const res = await fetch(CREATE_ORDER_URL(token, userId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // title, description, imageUrl, price
        ...payload,
        date: szDate.toISOString()
      })
    });

    // catch err
    if (!res.ok) {
      throw new Error('Something went wrong!')
    }

    const resData = await res.json();

    // store into redux
    return dispatch({
      type: ADD_ORDER, payload: {
        id: resData.name,
        date: szDate,
        ...payload
      }
    });
  } catch (err) {
    // send to custom analytics server
    console.log(err);
    throw err;
  }
}
