const URL_FIREBASE = `https://rn-shopping-app-2d05b-default-rtdb.firebaseio.com/`;


export const GET_PRODUCT_URL = () => `${URL_FIREBASE}/products.json`;
export const CREATE_PRODUCT_URL = (token) => `${URL_FIREBASE}/products.json?auth=${token}`;
export const UPDATE_PRODUCT_URL = (token, id) => `${URL_FIREBASE}/products/${id}.json?auth=${token}`;

export const GET_ORDER_URL = (userId) => `${URL_FIREBASE}/orders/${userId}.json`;
export const CREATE_ORDER_URL = (token, userId) => `${URL_FIREBASE}/orders/${userId}.json?auth=${token}`;
// export const UPDATE_ORDER_URL = (token, id) => `${URL_FIREBASE}/orders/${id}.json?auth=${token}`;

// ===========================================
const API_KEY = `AIzaSyA5e23qb7htd0yWgl3UsxLgUXei8Izz8mU`;
export const SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
export const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
