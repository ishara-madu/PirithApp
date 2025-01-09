// In App.js in a new project

import * as React from 'react';
import Home from './src/pages/Home';
import { GlobalProvider } from './src/components/Hooks/GlobalContext';
import { fetchData, getData, getDataVariable } from './src/pages/Database';
import Welcome from './src/pages/Welcome';
import Loading from './src/components/Loading';
import ConnectivityChecker from './src/components/ConnectivityChecker';
import ExitAlert from './src/components/ExitAlert';

function App() {
  const [welcome, setWelcome] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any>([]);


  React.useEffect(() => {
    const fetchWelcome = async () => {
      try {
        const welcome = await getDataVariable('Welcome');
        setWelcome(welcome ?? true);
        try {
          await fetchData();
          const fetchAsyncData = async () => {
            try {
              const users = await getData("item");
              setData(users);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
          await fetchAsyncData();
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);

      }
    }
    fetchWelcome();
  }, [])

  const text = "This may take few minutes for loading dependecies..."


  return (
    <GlobalProvider data={data}>
      {loading ? (
        <Loading text={text} />
      ) : (
        welcome ? (
          <Welcome onChange={setWelcome} />
        ) : (
          <Home />
        )
      )
      }
      <ConnectivityChecker />
      <ExitAlert />
    </GlobalProvider>
  );
}

export default App;