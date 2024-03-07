// FavoritesContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../constants";
import { useState } from 'react';

const FavoritesContext = createContext();

const initialState = {
  favorites: [],
};

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(item => item !== action.payload),
      };
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      };
    default:
      return state;
  }
}


export const FavoritesProvider = ({ children }) => {


    const [state, dispatch] = useReducer(favoritesReducer, initialState);
  
    const fetchFavorites = async () => {
    //   try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
          console.log('Access token not found');
          return;
        }
  
        const response = await fetch(`${BASE_URL}/favorites/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
  
        if (!response.ok) {
          console.log('Failed to fetch favorites');
        }
  
        const data = await response.json();
        console.log("Fetched favorites data:", data);

        if (Array.isArray(data)) {
            dispatch({ type: 'SET_FAVORITES', payload: data });
          } else {
            console.log('Unexpected data format received:', data);
          }

        // dispatch({ type: 'SET_FAVORITES', payload: data });



    //   } catch (error) {
        // console.error('Error fetching favorites:', error);
    //   }
    };
  
    // Automatically fetch favorites after any action that could modify the favorites list
    useEffect(() => {
      fetchFavorites();
    }, [state.favorites.length]); // Depend on the length of favorites array to refetch after changes
  
    // Enhanced dispatch function that fetches favorites after add or remove actions
    const enhancedDispatch = (action) => {
      dispatch(action);
      if (action.type === 'ADD_FAVORITE' || action.type === 'REMOVE_FAVORITE') {
        fetchFavorites(); // Refetch favorites after an add or remove operation
      }
    };
  
    return (
      <FavoritesContext.Provider value={{ state, dispatch: enhancedDispatch }}>
        {children}
      </FavoritesContext.Provider>
    );
  };
  
  export const useFavorites = () => useContext(FavoritesContext);