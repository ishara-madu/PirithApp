import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import NetInfo from '@react-native-community/netinfo';


export const saveData = async (group: any, url: any, name: any, artist: any, playlist: any) => {
  try {
    const data = {
      url,
      name,
      artist,
      playlist,
    }
    await AsyncStorage.setItem(`${group}-${url}`, JSON.stringify(data));
  } catch (error) {
    console.log(error);

  }
}


export const fetchData = async () => {
  let value: any;
  NetInfo.addEventListener(state => {
    value = state.isConnected
  });
  if (value === true) {
    try {
      const tempIdsFirebase: any = [];
      let tempIdsAsync: any = [];
      const querySnapshot = await getDocs(collection(db, 'Items'));
      querySnapshot.forEach((doc) => {
        tempIdsFirebase.push(doc.id);
      });
      try {
        const keys = await AsyncStorage.getAllKeys();
        tempIdsAsync = keys.filter(key => key.startsWith(`item-`));
        tempIdsAsync.map(async (value: any, index: any) => {
          const result = tempIdsFirebase.includes(value);
          if (!result) {
            await AsyncStorage.removeItem(value);
          }
        }
        );
        tempIdsFirebase.map(async (value: any, index: any) => {
          querySnapshot.forEach(async (doc) => {
            const result = tempIdsAsync.includes(value);
            if (result) {
              if (doc.id === value) {
                const items: any = await AsyncStorage.getItem(value);
                const data = JSON.parse(items);
                data.name = doc.data().name;
                data.artist = doc.data().artist;
                data.playlist = doc.data().playlist;
                await AsyncStorage.setItem(value, JSON.stringify(data));
              }
            } else {
              if (doc.id == value) {
                saveData("item", doc.data().url, doc.data().name, doc.data().artist, doc.data().playlist)
              }
            }
          })
        })

      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error('Error fetching documents: ', error);
    }
  }
};


export const saveDataVariable = async (id: any, data: any) => {
  try {
    await AsyncStorage.setItem(`${id}`, JSON.stringify(data));
  } catch (error) {
    console.log(error);

  }

}
export const getDataVariable = async (id: any) => {
  try {
    const value: any = await AsyncStorage.getItem(id);
    return JSON.parse(value)
  } catch (error) {
    console.log("Error fetching data:", error);
    return null; // Return null in case of an error
  }
};



export const getData = async (group: any) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const userKeys = keys.filter(key => key.startsWith(`${group}-`));
    const userValues = await AsyncStorage.multiGet(userKeys);

    return userValues.map(([key, value]: any) => ({
      key,  // Retain key for reference
      ...JSON.parse(value)  // Spread parsed data directly
    }));
  } catch (error) {
    console.error("Error retrieving user data:", error);
  }


};



export const updateFavorite = async (favorite: any, url: any) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const itemKeys = keys.filter(key => key.startsWith("item-"));
    const items = await AsyncStorage.multiGet(itemKeys);

    const itemToUpdate = items.find(([key, value]: any) => {
      const data = JSON.parse(value);
      return data.url === url;
    });

    if (itemToUpdate) {
      const [key, value]: any = itemToUpdate;
      const data = JSON.parse(value);

      data.isFavorites = favorite;
      await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log(`Item with URL ${url} updated successfully.`);
    } else {
      console.log(`Item with URL ${url} not found.`);
    }
  } catch (error) {
    console.error("Error updating favorite status by URL:", error);
  }
};


