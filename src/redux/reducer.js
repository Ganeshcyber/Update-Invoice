import { ADD_ITEM, DELETE_ITEM, UPDATE_TOTAL_AMOUNT, RESET_ITEMS } from './action';


const initialState = {
    customerDetails: {
      
      name: '',
      phoneNumber: '',
      email: '',
      date: '',
      address: '',
    },
  items: [
    {
      sNo: 1,
      itemName: '',
      qty: '',
      price: '',
      amount: '',
    },
  ],
  totalAmount: 0,
  sNoCounter: 2,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
        sNoCounter: state.sNoCounter + 1,
      };

      case 'SET_CUSTOMER_DETAILS':
        return {
          ...state,
          customerDetails: {
            // invoiceNumber: action.payload.invoiceNumber,
            CustomerName: action.payload.CustomerName,
            phoneNumber: action.payload.phoneNumber,
            email: action.payload.email,
            date: action.payload.date,
            address: action.payload.address,
          },
        };

    case DELETE_ITEM:
      const updatedItems = [...state.items];
      updatedItems.splice(action.payload, 1);
      return {
        ...state,
        items: updatedItems,
      };

    case UPDATE_TOTAL_AMOUNT:
      const newTotalAmount = action.payload.reduce(
        (total, item) => total + parseFloat(item.amount || 0),
        0,
      );
      return {
        ...state,
        totalAmount: newTotalAmount.toFixed(2),
        items: action.payload,
      };

    case RESET_ITEMS:
      return {
        ...state,
        items: initialState.items,
        totalAmount: initialState.totalAmount,
        sNoCounter: initialState.sNoCounter,
      };

      case 'ADD_CUSTOMER_DETAILS':
        return {
          ...state,
          customerDetails: {
            ...state.customerDetails,
            ...action.payload,
          },
        };

    default:
      return state;
  }
};

export default reducer;
