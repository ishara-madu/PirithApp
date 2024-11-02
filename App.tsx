// In App.js in a new project

import * as React from 'react';
import Home from './src/pages/Home';
import { GlobalProvider } from './src/components/Hooks/GlobalContext';
import { fetchData, getDataVariable } from './src/pages/Database';
import Welcome from './src/pages/Welcome';
import Loading from './src/components/Loading';
import ConnectivityChecker from './src/components/ConnectivityChecker';

function App() {
  const [welcome, setWelcome] = React.useState(true);
  const [loading, setLoading] = React.useState(true);


  React.useEffect(() => {
    const fetchWelcome = async () => {
      try {
        const welcome = await getDataVariable('Welcome');
        setWelcome(welcome ?? true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    }
    fetchWelcome();
  }, [])

  const text = "This may take a long time on the first launch..."


  return (
    <GlobalProvider>
      <ConnectivityChecker/>
      {loading ? (
        <Loading text={text}/>
      ) : (
        welcome ? (
          <Welcome onChange={setWelcome} />
        ) : (
          <Home />
        )
      )
      }
    </GlobalProvider>

  );
}

export default App;