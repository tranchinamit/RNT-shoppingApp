const URL_FIREBASE = `https://rn-shopping-app-2d05b-default-rtdb.firebaseio.com/`;


export const PRODUCT_URL = `${URL_FIREBASE}/products.json`;
export const UPDATE_PRODUCT_URL = (id) => `${URL_FIREBASE}/products/${id}.json`;

export const ORDER_URL = `${URL_FIREBASE}/orders/u1.json`;
export const UPDATE_ORDER_URL = (id) => `${URL_FIREBASE}/orders/${id}.json`;

// ===========================================
const API_KEY = `AIzaSyA5e23qb7htd0yWgl3UsxLgUXei8Izz8mU`;
export const SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
export const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
