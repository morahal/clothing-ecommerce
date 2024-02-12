import React, { createContext, useReducer, useContext } from 'react';

// Initial state of the bag
const initialState = {
  bagItems: [],
};

// Create a context
const BagContext = createContext();

// Reducer function to manage actions
function bagReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_BAG':
      return { ...state, bagItems: [...state.bagItems, action.payload] };
    case 'CLEAR_BAG':
      return { ...state, bagItems: [] };
    default:
      return state;
  }
}

// Context provider component
export const BagProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bagReducer, initialState);

  return (
    <BagContext.Provider value={{ state, dispatch }}>
      {children}
    </BagContext.Provider>
  );
};

// Custom hook to use the bag context
export const useBag = () => useContext(BagContext);
