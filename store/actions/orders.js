import Order from '../../models/order';
import { ORDER_URL } from '../../services/index';

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => async dispatch => {
  try {
    // calling API
    const res = await fetch(ORDER_URL);

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

export const addOrder = (payload) => async dispatch => {
  try {
    const szDate = new Date();
    // calling API
    const res = await fetch(ORDER_URL, {
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
