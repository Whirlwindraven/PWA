import { openDB as initializeDB } from 'idb';

const dbName = 'jate';
const dbVersion = 1;
const storeName = 'jate';

const initDatabase = async () => {
  const db = await initializeDB(dbName, dbVersion, {
    upgrade(database) {
      if (!database.objectStoreNames.contains(storeName)) {
        database.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        console.log(`${storeName} database created`);
      } else {
        console.log(`${storeName} database already exists`);
      }
    },
  });
};

// Add logic to a method that accepts some content and adds it to the database
export const writeToDb = async (content) => {
  const db = await initializeDB(dbName, dbVersion);
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);

  const putRequest = store.put({ id: 1, value: content });
  const putResult = await putRequest;

  console.log('🚀 - data saved to the database', putResult);
};

// Add logic for a method that gets all the content from the database
export const readFromDb = async () => {
  const db = await initializeDB(dbName, dbVersion);
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);

  const getRequest = store.get(1);
  const getResult = await getRequest;

  console.log('result.value', getResult);
  return getResult?.value;
};

initDatabase();
