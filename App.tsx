// In App.js in a new project

import * as React from 'react';
import Home from './src/pages/Home';
import { GlobalProvider } from './src/components/Hooks/GlobalContext';
import { fetchData } from './src/pages/Database';
import Welcome from './src/pages/Welcome';

function App() {

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <GlobalProvider>
      <Welcome/>
      <Home />
    </GlobalProvider>

  );
}

export default App;