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
  db.runSync("INSERT INTO items (id, url, name, artist, playlist, isFavorites) VALUES (?,?,?,?,?,?)", ['id2', 'dqkxmiI0kYo', 'Song 2', 'Artist 2', 'playlist 1', true]);
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

export const getAllData = (keyword: any, showPlaylist?: boolean): Item[] => {
  const db = openDatabase();

  const query = `
    SELECT 
    *
    FROM items 
    WHERE (id || name || artist) LIKE ? 
    ${showPlaylist ? "GROUP BY playlist" : ""}
    ORDER BY id DESC
  `;

  const results = db.getAllSync(query, [`%${keyword}%`]) as Item[];

    return results.map((item, index) => ({
      uniqueId: index, 
      ...item, 
    }));
  

};

export const getFovoriteData = (keyword:any)=>{
  const db = openDatabase();
  return db.getAllSync("SELECT * FROM items WHERE isFavorites = ? AND (name || artist) LIKE ?", [true, `%${keyword}%`]);
}


export const getPlaylistData = (playlist:any)=>{
  const db = openDatabase();
  return db.getAllSync("SELECT * FROM items WHERE playlist =?", [playlist]);
}


export const updateFavorite = (favorite:boolean,id:any)=>{
  const db = openDatabase();
  db.runSync("UPDATE items SET isFavorites = ? WHERE url = ?", [favorite, id]);
}