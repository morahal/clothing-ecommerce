import React from 'react';
import { BagProvider } from './bagCntext';
// Import your context providers
// import { UserProvider } from './UserContext';
// import { ThemeProvider } from './ThemeContext';
// Add more providers as needed

const CombinedProviders = ({ children }) => {
  return (
    <BagProvider>
          {/* Nest more providers as needed */}
          {children}
    </BagProvider>
  );
};

export default CombinedProviders;
