import * as SQLite from 'expo-sqlite';
import { useState } from 'react';

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


export const insertData = ()=>{
  const db = openDatabase();
  db.runSync("INSERT INTO items (id, url, name, artist, playlist, isFavorites) VALUES (?,?,?,?,?,?)", ['id3', 'y8YBkbgw18E', 'Song 3', 'Artist 3', 'playlist 2', false]);
}
export const dropTable = ()=>{
  const db = openDatabase();
  db.runSync("DROP TABLE IF EXISTS items");
  console.log("dropped successfully");
}

interface Item {
  id: number;  
  name: string;
  artist: string;
  playlist?: string; 
}

export const getAllData = (keyword: string, showPlaylist: boolean = false, home: boolean = false): Item[] => {
  const db = openDatabase();

  // Define the base query based on the `home` parameter
  const query = home
    ? "SELECT * FROM items WHERE url = ?"
    : `
      SELECT 
        * 
      FROM 
        items 
      WHERE 
        (name || artist) LIKE ? 
      ${showPlaylist ? "GROUP BY playlist" : ""}
      ORDER BY 
        id DESC
    `;

  const results = db.getAllSync(query, home ? [keyword] : [`%${keyword}%`]) as Item[];

  return results.map((item, index) => ({
    ...item,
    uniqueId: index, 
  }));
};


export const getPlaylistData = (playlist:any):Item[]=>{
  const db = openDatabase();
  const results = db.getAllSync("SELECT * FROM items WHERE playlist = ?", [playlist]) as Item[];
  return results.map((item, index) => ({
    ...item,
    uniqueId: index, 
  }));
}

export const getFovoriteData = (keyword:any): Item[]=>{
  const db = openDatabase();
  const query = `SELECT * FROM items WHERE isFavorites = true AND (name || artist) LIKE ? ORDER BY id DESC`;
  const results = db.getAllSync(query, [`%${keyword}%`]) as Item[];
  return results.map((item, index) => ({
    uniqueId: index, 
    ...item, 
  }));
}




export const updateFavorite = (favorite:boolean,id:any)=>{
  const db = openDatabase();
  db.runSync("UPDATE items SET isFavorites = ? WHERE url = ?", [favorite, id]);
}