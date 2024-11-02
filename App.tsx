// In App.js in a new project

import * as React from 'react';
import Home from './src/pages/Home';
import { GlobalProvider } from './src/components/Hooks/GlobalContext';
import { fetchData, getData, getDataVariable } from './src/pages/Database';
import Welcome from './src/pages/Welcome';
import Loading from './src/components/Loading';
import ConnectivityChecker from './src/components/ConnectivityChecker';
import { err } from 'react-native-svg';

function App() {
  const [welcome, setWelcome] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any>([]);


  React.useEffect(() => {
    const fetchWelcome = async () => {
      try {
        const welcome = await getDataVariable('Welcome');
        setWelcome(welcome ?? true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        try {
          await fetchData();
          const fetchAsyncData = async () => {
            try {
              const users = await getData("item");
              setData(users);
              console.log('feched');

            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
          await fetchAsyncData();
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchWelcome();
  }, [])

  const text = "This may take a long time on the first launch..."


  return (
    <GlobalProvider data={data}>
      <ConnectivityChecker />
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
    </GlobalProvider>

  );
}

export default App;