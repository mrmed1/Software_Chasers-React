/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// // Scripts for firebase and firebase messaging
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
//   apiKey: "AIzaSyCEuYmo79_9_eLOWZzlgREHp8KTTO7LwqE",
//   authDomain: "isamm-f1a20.firebaseapp.com",
//   projectId: "isamm-f1a20",
//   storageBucket: "isamm-f1a20.appspot.com",
//   messagingSenderId: "826498335334",
//   appId: "1:826498335334:web:c5440e1ad2837a2be163a7",
// };

// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// const messaging = firebase.messaging();
// // messaging.onBackgroundMessage(function (payload) {
// //   const channel = new BroadcastChannel("sw-messages");
// //   channel.postMessage(payload);
// // });

// messaging.onBackgroundMessage(function(payload) {
//     console.log('Received background message ', payload);

//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//       body: payload.notification.body,
//     };

//     // eslint-disable-next-line no-restricted-globals
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });

importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");


firebase.initializeApp({
  apiKey: "AIzaSyCEuYmo79_9_eLOWZzlgREHp8KTTO7LwqE",
  authDomain: "isamm-f1a20.firebaseapp.com",
  projectId: "isamm-f1a20",
  storageBucket: "isamm-f1a20.appspot.com",
  messagingSenderId: "826498335334",
  appId: "1:826498335334:web:c5440e1ad2837a2be163a7",
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  const channel = new BroadcastChannel("sw-messages");
  channel.postMessage(payload);
});
