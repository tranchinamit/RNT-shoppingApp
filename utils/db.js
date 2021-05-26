import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

// https://docs.expo.io/versions/v41.0.0/sdk/sqlite/

const initDB = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)",
        [],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });

const insertPlace = ({ address, title, imageUri, lat, lng }) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?,?,?,?,?)`,
        [title, imageUri, address, lat, lng],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });

const getPlaces = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });

export default { initDB, insertPlace, getPlaces };
