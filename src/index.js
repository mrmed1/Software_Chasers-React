import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import "semantic-ui-css/semantic.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

// import Firebase from "./firebase";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getMessaging } from "firebase/messaging";
import { registerServiceWorker } from "./register-sw";

const firebaseConfig = {
  apiKey: "AIzaSyCEuYmo79_9_eLOWZzlgREHp8KTTO7LwqE",
  authDomain: "isamm-f1a20.firebaseapp.com",
  projectId: "isamm-f1a20",
  storageBucket: "isamm-f1a20.appspot.com",
  messagingSenderId: "826498335334",
  appId: "1:826498335334:web:c5440e1ad2837a2be163a7",
};

// Initialize Firebase
const initFire = initializeApp(firebaseConfig);

export const messaging = getMessaging(initFire);

registerServiceWorker();

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
