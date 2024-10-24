import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, onValue, get, child } from "firebase/database";
import { database } from "../../firebaseConfig";
import { useEffect } from 'react';
import { Value } from '../../node_modules/@firebase/remote-config-types/index.d';

interface Item {
  id: string;
  name: string;
  artist: string;
  status: string;
}


export const storeData = async (id: string, name: string, artist: string, status: string) => {
  // Check if all required fields are provided
  if (id && status) {
    const value = {
  id, 
  name: name || 'Unnamed',
  artist: artist || 'Unknown Artist', 
  status, 
};

const jsonValue = JSON.stringify(value);
await AsyncStorage.setItem(id, jsonValue);

  }
};

export const fetchData = () => {
  const dbRef = ref(database);
  
  // Set up a real-time listener
  onValue(dbRef, async (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val() as Record<string, Item>;
      const keys = await AsyncStorage.getAllKeys();
      const valuesNotIn = keys.filter(key => !Object.keys(data).includes(key));

      await Promise.all(valuesNotIn.map(key => AsyncStorage.removeItem(key)));

      await Promise.all(Object.values(data).map(item => 
        storeData(item.id, item.name, item.artist, item.status)
      ));
      
    } else {
      await AsyncStorage.clear();
    }
  });
};





export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All AsyncStorage data cleared');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};


export const getData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const values = [];

    for (const key of keys) {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const parsedValue = JSON.parse(value); // Assuming value is stored as JSON
        values.push({
          id: parsedValue.id,
          name: parsedValue.name, 
          artist: parsedValue.artist,
          status: parsedValue.status,
        });
      }
    }

    return values; // Return the array of values

};


export const displayAllKeys = async () => {
  try {
    // Step 1: Retrieve all keys
    const keys = await AsyncStorage.getAllKeys();

    // Step 2: Display all the keys (IDs)
    if (keys.length > 0) {
      console.log('Keys stored in AsyncStorage:', keys);
    } else {
      console.log('No keys found in AsyncStorage');
    }
  } catch (error) {
    console.error('Error retrieving keys from AsyncStorage:', error);
  }
};

