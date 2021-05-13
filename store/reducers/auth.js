import { SIGN_IN, SIGN_UP, AUTHENTICATE, LOG_OUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  expired: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTHENTICATE:
      return {
        token: payload.token,
        userId: payload.userId,
        expired: payload.expired,
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
