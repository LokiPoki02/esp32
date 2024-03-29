import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA4EPFB2SCUSUVc9RkDDUXIlcWhIhwCJxM",
  authDomain: "esp32db-1c7ed.firebaseapp.com",
  databaseURL: "https://esp32db-1c7ed-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "esp32db-1c7ed",
  storageBucket: "esp32db-1c7ed.appspot.com",
  messagingSenderId: "111577244132",
  appId: "1:111577244132:web:b1922e549685d262c727f1"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const progressValueElement = document.querySelector('.progress-value'); 
const circularProgressElement = document.querySelector('.pie-chart-left'); 
const circularProgressElement2 = document.querySelector('.pie-chart-right');  

const voltageRef = ref(database, 'voltage');

onValue(voltageRef, (snapshot) => {
    const voltage = snapshot.val();
    progressValueElement.textContent = `${voltage}`;

    // const percentage = (50 * voltage - 9000) / 70 ;
    const percentage = voltage - 200;
    circularProgressElement.style.setProperty('--value',percentage + '%');
    circularProgressElement2.style.setProperty('--value',percentage + '%');
});
