// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4EPFB2SCUSUVc9RkDDUXIlcWhIhwCJxM",
  authDomain: "esp32db-1c7ed.firebaseapp.com",
  databaseURL: "https://esp32db-1c7ed-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "esp32db-1c7ed",
  storageBucket: "esp32db-1c7ed.appspot.com",
  messagingSenderId: "111577244132",
  appId: "1:111577244132:web:b1922e549685d262c727f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create Temperature Chart
const chartT = Highcharts.chart('chart-temperature', {
  series: [{
    name: 'Temperature',
    type: 'line',
    color: '#101D42',
    marker: {
      symbol: 'circle',
      radius: 3,
      fillColor: '#101D42',
    },
    data: [] // Початково пустий масив даних
  }],
  title: {
    text: undefined
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: { second: '%H:%M:%S' }
  },
  yAxis: {
    title: {
      text: 'Temperature Celsius Degrees'
    }
  },
  credits: {
    enabled: false
  }
});

// Отримати посилання на базу даних Firebase
const databaseRef = getDatabase(app);
const dataRef = ref(databaseRef, 'data');

// Створіть пустий масив для даних графіка
let chartData = [];

// Отримання даних з Firebase та їх обробка
onValue(dataRef, (snapshot) => {
  const data = snapshot.val(); // Отримати дані з снапшота
  if (data && Array.isArray(data)) {
    chartData = data.map(item => {
      return [new Date(item.time).getTime(), item.value]; // Перетворити дані у формат, придатний для Highcharts
    });
    
    // Оновіть графік з новими даними
    chartT.series[0].setData(chartData);
  }
});
