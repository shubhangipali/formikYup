// src/utils/localStorage.js
export const getCartItems = () => {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
  };
  
  export const saveCartItems = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };
  
  export const getFavItems = () => {
    const items = localStorage.getItem('favItems');
    return items ? JSON.parse(items) : [];
  };
  
  export const saveFavItems = (items) => {
    localStorage.setItem('favItems', JSON.stringify(items));
  };
  