import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const saveData = async (group:any,id:any,url:any,name:any,artist:any,playlist:any,isFavorites:any)=>{
  try {
    const data = {
      url,
      name,
      artist,
      playlist,
      isFavorites
    }
    await AsyncStorage.setItem(`${group}-${id}`,JSON.stringify(data));
  } catch (error) {
    console.log(error);
    
  }
}

export const saveDataVariable = async (id:any,data:any) =>{
try {
  await AsyncStorage.setItem(`${id}`,JSON.stringify(data));
} catch (error) {
  console.log(error);
  
}
}
export const getDataVariable = async (id: any) => {
  try {
    const value:any = await AsyncStorage.getItem(id);
    return JSON.parse(value)
  } catch (error) {
    console.log("Error fetching data:", error);
    return null; // Return null in case of an error
  }
};



export const getData = async (group:any) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const userKeys = keys.filter(key => key.startsWith(`${group}-`));
    const userValues = await AsyncStorage.multiGet(userKeys);

    return userValues.map(([key, value]:any) => ({
      key,  // Retain key for reference
      ...JSON.parse(value)  // Spread parsed data directly
    }));
  } catch (error) {
    console.error("Error retrieving user data:", error);
  }
};



export const updateFavorite = async (favorite:any,url:any) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
        const itemKeys = keys.filter(key => key.startsWith("item-"));
        const items = await AsyncStorage.multiGet(itemKeys);
    
    const itemToUpdate = items.find(([key, value]:any) => {
      const data = JSON.parse(value);
      return data.url === url;
    });
    
    if (itemToUpdate) {
      const [key, value]:any = itemToUpdate;
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


