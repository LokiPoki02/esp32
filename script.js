const firebaseConfig = {
    apiKey: "AIzaSyA4EPFB2SCUSUVc9RkDDUXIlcWhIhwCJxM",
  authDomain: "esp32db-1c7ed.firebaseapp.com",
  databaseURL: "https://esp32db-1c7ed-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "esp32db-1c7ed",
  storageBucket: "esp32db-1c7ed.appspot.com",
  messagingSenderId: "111577244132",
  appId: "1:111577244132:web:b1922e549685d262c727f1"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const timeRef = database.ref('time');
timeRef.on('value', (snapshot) => {
    const timeValue = snapshot.val();
    document.getElementById('timeValue').textContent = `Time: ${timeValue}`;
});
