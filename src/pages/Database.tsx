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


export const insertData =  ()=>{
  const db = openDatabase();
  db.runSync("INSERT INTO items (id, url, name, artist, playlist, isFavorites) VALUES (?,?,?,?,?,?)", ['id3', 'y8YBkbgw18E', 'Song 3', 'Artist 3', 'playlist 2', false]);
}
export const dropTable = ()=>{
  const db = openDatabase();
  db.runSync("DROP TABLE IF EXISTS items");
  console.log("dropped successfully");
}



export const getAllData = () => {
  const db = openDatabase();

  const query = "SELECT * FROM items"
  const results = db.getAllAsync(query);

  return results;
};







export const updateFavorite = (favorite:boolean,id:any)=>{
  const db = openDatabase();
  db.runSync("UPDATE items SET isFavorites = ? WHERE url = ?", [favorite, id]);
}