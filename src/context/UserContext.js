import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const setLoggedInUserData = (userData) => {
    setLoggedInUser(userData);
  };

  return (
    <UserContext.Provider
      value={{
        user: loggedInUser,
        setLoggedInUser: setLoggedInUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};