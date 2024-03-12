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



const voltageTextValue = document.querySelector('.voltage-value');
const leftProgressVoltage = document.querySelector('.voltage-left');
const rightProgressVoltage = document.querySelector('.voltage-right');

const currentTextValue = document.querySelector('.current-value');
const leftProgressCurrent = document.querySelector('.current-left');
const rightProgressCurrent = document.querySelector('.current-right');
 
const powerTextValue = document.querySelector('.power-value');
const leftProgressPower = document.querySelector('.power-left');
const rightProgressPower = document.querySelector('.power-right');

const voltageRef = ref(database, 'voltage');
const currentRef = ref(database, 'current');
const powerRef = ref(database, 'power');

onValue(voltageRef, (snapshot) => {
  const voltage = snapshot.val();
  voltageTextValue.textContent = voltage + " V";

  const percentage = voltage - 200;
  leftProgressVoltage.style.setProperty('--value',percentage + '%');
  rightProgressVoltage.style.setProperty('--value',percentage + '%');
});

onValue(currentRef, (snapshot) => {
    const current = snapshot.val();
    currentTextValue.textContent = current + " A";

    const percentage = current * 3.125;
    leftProgressCurrent.style.setProperty('--value',percentage + '%');
    rightProgressCurrent.style.setProperty('--value',percentage + '%');
});

onValue(powerRef, (snapshot) => {
  const power = snapshot.val();
  powerTextValue.textContent = power + " W";

  const percentage = power * 0.0125;
  leftProgressPower.style.setProperty('--value',percentage + '%');
  rightProgressPower.style.setProperty('--value',percentage + '%');
});



