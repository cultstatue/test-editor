import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

const initdb = async () => {
  // We are creating a new database named 'contact_db' which will be using version 1 of the database.
  openDB('jate_db', 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('content')) {
        console.log('contents store already exists');
        return;
      }
      // Create a new object store for the data and give it a key name of 'id' which will increment automatically
      db.createObjectStore('content', { keyPath: 'id', autoIncrement: true });
      console.log('contents store created');
    }
  })
}

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  
  const contactDb = await openDB('jate_db', 1);

  const tx = contactDb.transaction('content', 'readwrite');

  const store = tx.objectStore('content');

  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  
  // Create a connection to the IndexedDB database and the version we want to use.
  const contactDb = await openDB('jate_db', 1);

  // Create a new transaction and specify the store and data privileges.
  const tx = contactDb.transaction('content', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('content');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();