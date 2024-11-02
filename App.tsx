// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import { GlobalProvider } from './src/components/Hooks/GlobalContext';
import { fetchData } from './src/pages/Database';

const Stack = createNativeStackNavigator();



function App() {

React.useEffect(()=>{
  fetchData()
},[])

  return (
    <GlobalProvider>
      {/* <Welcome/> */}
      <Home/>
    </GlobalProvider>

  );
}

export default App;