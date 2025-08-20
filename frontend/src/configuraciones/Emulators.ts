import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { Auth, connectAuthEmulator } from 'firebase/auth';
import { getApp } from 'firebase/app';

export const runEmulators = ({ auth }: { auth: Auth }) => {
  const fire = getFirestore();
  const db = getDatabase();
  const functions = getFunctions(getApp());
  const storage = getStorage();

  connectAuthEmulator(auth, 'http://localhost:9099', {
    disableWarnings: true,
  });

  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectDatabaseEmulator(db, 'localhost', 9000);
  connectFirestoreEmulator(fire, 'localhost', 8004);
  connectStorageEmulator(storage, 'localhost', 9199);
};
