import { SIGN_UP_URL, SIGN_IN_URL } from '../../services';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';

export const signUp = ({ email, password }) => async dispatch => {
  try {
    const res = await fetch(SIGN_UP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    })

    //  catch err
    if (!res.ok) {
      const errResData = await res.json();
      const errorId = errResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await res.json();
    console.log(resData);

    // store into redux
    dispatch({
      type: SIGN_UP
    });
  } catch (err) {
    // send to custom analytics server
    console.log(err);
    throw err;
  }
}

export const signIn = ({ email, password }) => async dispatch => {
  try {
    const res = await fetch(SIGN_IN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    })

    // catch err
    if (!res.ok) {
      const errResData = await res.json();
      const errorId = errResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    console.log(res);
    const resData = await res.json();
    console.log(resData);

    // store into redux
    dispatch({
      type: SIGN_IN
    });
  } catch (err) {
    // send to custom analytics server
    console.log(err);
    throw err;
  }
}
