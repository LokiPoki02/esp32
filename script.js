import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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

    const percentage = voltage * 0.19;
    circularProgressElement.style.setProperty('--value',percentage + '%');
    circularProgressElement2.style.setProperty('--value',percentage + '%');
});

