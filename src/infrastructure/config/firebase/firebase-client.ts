import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
  } from 'firebase/messaging';
import { printLogError } from 'presentation/logs/logs';

const firebaseConfig = {
  apiKey: "AIzaSyD0xvu01m5YGXNr8xHCnbRT3ngwqlQvF9o",
  authDomain: "pad-tech-c127c.firebaseapp.com",
  projectId: "pad-tech-c127c",
  storageBucket: "pad-tech-c127c.appspot.com",
  messagingSenderId: "526014371892",
  appId: "1:526014371892:web:9e98913931bcfd6da89261"
};

export const app = initializeApp(firebaseConfig);

// export const analytics = getAnalytics(app);

export const db = getFirestore();

export const storage = getStorage(app);

const initMessaging = async () => {
    try {
      let messagingInit: any = '';
  
      await isSupported().then((response) => {
        if (response) {
          messagingInit = getMessaging(app);
        }
      });
  
      return messagingInit;
    } catch (error) {
      return null;
    }
  };

  
export const SERVER_KEY = 'AAAA1ozjYUk:APA91bE8mORvZYbaSkkfAQR4qC7tMqWLoZQuGsfuWvgdObGVbNwJAg9_5NwGK2RSjeZuqEB9ZWndBajYn1o7NVlb9jae2S8EsPzmh6Ikbn-6UoMv2Qhk1cSxvLJN5J3zhNZKDXfCKAIE';
export const VAPID_KEY = 'BA_gVMlAH-dHaUYDWfEmTYeh-8lgmTSRm2hx2Q6jfuVlcUweoH2lfPRR6yOZGOI0uEZhB3pgk5sYc5HQR0YOyfY';
  
export const messaging = initMessaging();

export const getTokenMessaging = async () => {
  try {
    if (messaging) {
      const messagingService = await messaging.then((response) => {
        return response;
      });

      const currentToken = await getToken(messagingService, {
        vapidKey: VAPID_KEY,
      });
      
      return currentToken;
    }

    return '';
  } catch (error) {
    const exception = error as any;
    printLogError(exception);
    return "error";
  }
};

export const onMessageListener = () =>
  new Promise(async (resolve) => {
    onMessage(await messaging, (payload) => {
      resolve(payload);
    });
  });
