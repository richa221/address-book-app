module.exports = {
  HOST: "127.0.0.1",
  USER: "postgres",
  PASSWORD: "Deepesh@123",
  DB: "address-book",
  operatorsAliases: 0,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  firebase:{
    apiKey: "AIzaSyDsla9N8RtSQATADyhgqoTY77C1-c7KwNk",
    authDomain: "carauction-9b672.firebaseapp.com",
    databaseURL: "https://carauction-9b672.firebaseio.com",
    projectId: "carauction-9b672",
    storageBucket: "carauction-9b672.appspot.com",
    messagingSenderId: "1066316909892",
    appId: "1:1066316909892:web:6d172f1465790332e05b11",
    measurementId: "G-GF4KJ40BNB"
  }
};