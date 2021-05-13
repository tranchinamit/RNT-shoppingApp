import { SIGN_UP_URL, SIGN_IN_URL } from '../../services';
import { clearSession, saveSession } from '../../storage';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const LOG_OUT = 'LOG_OUT';

export const AUTHENTICATE = 'AUTHENTICATE';


let timer;

export const authenticate = (payload) => dispatch => {
  dispatch(setLogoutTimer(payload.expirationTime));
  dispatch({ type: AUTHENTICATE, payload })
}

export const logout = () => async dispatch => {
  clearLogoutTimer();
  await clearSession();
  dispatch({ type: LOG_OUT })
}

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}

const setLogoutTimer = expirationTime => dispatch => {
  timer = setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
}

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
    const expirationTime = 60 * 60 * 1000;
    const expired = Date.parse(new Date()) + expirationTime;
    dispatch(authenticate({ token: resData.idToken, userId: resData.localId, expired, expirationTime }))
    saveSession({ token: resData.idToken, userId: resData.localId, expired })
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
    // const expirationTime = 60 * 60 * 1000;
    const expirationTime = 10 * 1000;
    const expired = Date.parse(new Date()) + expirationTime;
    dispatch(authenticate({ token: resData.idToken, userId: resData.localId, expired, expirationTime }))
    saveSession({ token: resData.idToken, userId: resData.localId, expired })
  } catch (err) {
    // send to custom analytics server
    console.log(err);
    throw err;
  }
}
