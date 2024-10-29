import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const saveData = async (id:any,url:any,name:any,artist:any,playlist:any,isFavorites:any)=>{
  try {
    const data = {
      url,
      name,
      artist,
      playlist,
      isFavorites
    }
    await AsyncStorage.setItem(`item-${id}`,JSON.stringify(data));
  } catch (error) {
    console.log(error);
    
  }
}

export const getData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const userKeys = keys.filter(key => key.startsWith("item-"));
    const userValues = await AsyncStorage.multiGet(userKeys);

    return userValues.map(([key, value]) => ({
      key,  // Retain key for reference
      ...JSON.parse(value)  // Spread parsed data directly
    }));
  } catch (error) {
    console.error("Error retrieving user data:", error);
  }
};



export const updateFavorite = async (favorite,url) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
        const itemKeys = keys.filter(key => key.startsWith("item-"));
        const items = await AsyncStorage.multiGet(itemKeys);
    
    const itemToUpdate = items.find(([key, value]) => {
      const data = JSON.parse(value);
      return data.url === url;
    });
    
    if (itemToUpdate) {
      const [key, value] = itemToUpdate;
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


export const openDatabase = ()=>{
  const db = SQLite.openDatabaseSync("db.db");

  db.withTransactionSync(() => {
    db.runSync(
      `CREATE TABLE IF NOT EXISTS items (
        id VARCHAR(255) PRIMARY KEY NOT NULL,
        url VARCHAR(255) NOT NULL,
        name VARCHAR(255) DEFAULT 'Unknown',
        artist VARCHAR(255) DEFAULT 'Unknown artist',
        playlist VARCHAR(255),
        isFavorites BOOLEAN DEFAULT false
      );`
    );
  });

  return db;
};





export const getAllData = () => {
  const db = openDatabase();
  
  const query = "SELECT * FROM items"
  const results = db.getAllAsync(query);
  
  return results;
};




export const dropTable = ()=>{
  const db = openDatabase();
  db.runSync("DROP TABLE IF EXISTS items");
  console.log("dropped successfully");
}




// export const updateFavorite = (favorite:boolean,id:any)=>{
//   const db = openDatabase();
//   db.runSync("UPDATE items SET isFavorites = ? WHERE url = ?", [favorite, id]);
// }