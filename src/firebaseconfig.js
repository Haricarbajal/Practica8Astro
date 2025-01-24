// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, update , onValue} from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "https://myapp-676b1-default-rtdb.firebaseio.com/",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const fetchWalpapers = async () => {
  const walpaperRef = ref(database, 'walpapers');
  const snapshot = await get(walpaperRef);
  return snapshot.exists() ? snapshot.val() : {};
}


export const fetchWalpapersRealTime = (callback) => {
  const walpaperRef = ref(database, 'walpapers');

  onValue(walpaperRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      callback({});
    }
  });
};

export const updateLikes = async (id) => {
  const walpaperRef = ref(database, `walpapers`);
  const snapshot = await get(walpaperRef);

  if (snapshot.exists()) {
    const walpapers = snapshot.val();

    const key = Object.keys(walpapers).find((key) => walpapers[key].id === id);

    if (key) {
      const currentLikes = walpapers[key].likes || 0;
      const newLikes = currentLikes + 1;
      await update(ref(database, `walpapers/${key}`), { likes: newLikes });
      return newLikes;
    } else {
      console.error('No se encontró el wallpaper con el id:', id);
    }
  }

  return null;
};