import React from 'react';
import { BagProvider } from './bagCntext';
import {  FavoritesProvider } from './favContext';
// Import your context providers
// import { UserProvider } from './UserContext';
// import { ThemeProvider } from './ThemeContext';
// Add more providers as needed

const CombinedProviders = ({ children }) => {
  return (
    <BagProvider>
      <FavoritesProvider> 
          {/* Nest more providers as needed */}
          {children}
       </FavoritesProvider> 
    </BagProvider>
  );
};

// const CombinedProviders = ({ children }) => {
//   return (
//     <FavoritesProvider> 
//       <BagProvider>
       
//         {children}
//       </BagProvider>
//     </FavoritesProvider>
//   );
// };

export default CombinedProviders;
