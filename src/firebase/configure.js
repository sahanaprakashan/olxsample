import { initializeApp } from 'firebase/app';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAFnwibkzcL0AQnMirjlFx6LHhTjSvGyZE",
    authDomain: "fir-78ce9.firebaseapp.com",
    projectId: "fir-78ce9",
    storageBucket: "fir-78ce9.appspot.com",
    messagingSenderId: "196808997685",
    appId: "1:196808997685:web:311999c582dbb2d3c76a7c",
    measurementId: "G-PTPBBMC5GP"
  };
  export const Firebase =  initializeApp(firebaseConfig);