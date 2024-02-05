import React from 'react';
import { UserProvider } from './src/context/UserContext';
import StackNavigation from './src/navigations/Stack';

const App = () => {
  return (
    <UserProvider>
      <StackNavigation />
    </UserProvider>
  );
};

export default App;