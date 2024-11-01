// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Welcome from './src/pages/Welcome';
import 'react-native-gesture-handler';
import Playlist from './src/pages/Playlist';
import Menu from './src/pages/Menu';
import Settings from './src/pages/Settings';
import About from './src/pages/About';
import { GlobalProvider } from './src/components/Hooks/GlobalContext';
import { Alert, BackHandler } from 'react-native';
import ExitAlert from './src/components/ExitAlert';
import { fetchData } from './src/pages/Database';

const Stack = createNativeStackNavigator();



function App() {

React.useEffect(()=>{
  fetchData()
},[])

  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
          <Stack.Screen name="About" component={About} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
        <ExitAlert />
    </GlobalProvider>

  );
}

export default App;