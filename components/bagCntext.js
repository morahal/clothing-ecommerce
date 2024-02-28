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
    // case 'ADD_TO_BAG':
    //   return { ...state, bagItems: [...state.bagItems, action.payload] };
    case 'ADD_TO_BAG':
      const existingItemIndex = state.bagItems.findIndex(
        (item) => item.id === action.payload.id && item.s_ize === action.payload.size && item.colour === action.payload.colour
      );
      if (existingItemIndex !== -1) {
        console.log(existingItemIndex);
        // Increment quantity of existing item
        let newBagItems = [...state.bagItems];
        newBagItems[existingItemIndex] = {
          ...newBagItems[existingItemIndex],
          quantity: newBagItems[existingItemIndex].quantity + 1,
        };
        console.log(newBagItems[existingItemIndex].quantity);
        return { ...state, bagItems: newBagItems };
      } else {
        // Add new item
        return { ...state, bagItems: [...state.bagItems, { ...action.payload, quantity: 1 }] };
      }
    case 'CLEAR_BAG':
      return { ...state, bagItems: [] };
    case 'REMOVE_ITEM':
      const { id, size, colour } = action.payload;
      return {
        ...state,
        bagItems: state.bagItems.filter(bagItem =>
          !(bagItem.id === id && bagItem.s_ize === size && bagItem.colour === colour)
        ),
      };
    case 'INCREMENT_QUANTITY':

      return {
        ...state,
        bagItems: state.bagItems.map(item =>
          item.id === action.payload.id && item.s_ize === action.payload.size && item.colour === action.payload.colour ?
            {
              ...item,
              //quantity: item.quantity + 1
              quantity: item.quantity < item.remaining_quantity ? item.quantity + 1 : item.quantity // Only increment if below max
            } : item
        ),
      };

    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        bagItems: state.bagItems.map(item =>
          item.id === action.payload.id && item.s_ize === action.payload.size && item.colour === action.payload.colour ?
            { ...item, quantity: Math.max(item.quantity - 1, 1) } : item // Ensures quantity does not go below 1
        ),
      };

    case "CLEAR_BAG":
      return {
        ...state,
        bagItems: [], // Set bagItems to an empty array
      };
    default:
      return state;
  }
}

// Context provider component
export const BagProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bagReducer, initialState);

  const clearBag = () => {
    dispatch({ type: "CLEAR_BAG" });
  };
  
  return (
    <BagContext.Provider value={{ state, dispatch, clearBag }}>
      {children}
    </BagContext.Provider>
  );
};

// Custom hook to use the bag context
export const useBag = () => useContext(BagContext);
