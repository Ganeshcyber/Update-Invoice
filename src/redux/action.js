
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_TOTAL_AMOUNT = 'UPDATE_TOTAL_AMOUNT';
export const RESET_ITEMS = 'RESET_ITEMS';
export const SET_CUSTOMER_DETAILS = 'SET_CUSTOMER_DETAILS'


export const setCustomerDetails = (details) => ({
    type: 'SET_CUSTOMER_DETAILS',
    payload: details,
  });

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const deleteItem = (index) => ({
  type: DELETE_ITEM,
  payload: index,
});

export const updateTotalAmount = (items) => ({
  type: UPDATE_TOTAL_AMOUNT,
  payload: items,
});

export const resetItems = () => ({
  type: RESET_ITEMS,
});
