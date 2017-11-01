const MongoClient = require('mongodb').MongoClient;
let _db = null;


module.exports = {
  ready: connect,
  getDb,
  convertDbToGame,
  convertGameToDb,
  zeroes,
  range,
  getCollectionName,
}


function connect() {
  if (_db) return Promise.resolve(_db);

  return new Promise((resolve, reject) => {
    MongoClient.connect('mongodb://localhost:27017/mastermind', function(err, db) {
  		if (err) {
  			console.log('Error connecting to MongoDb', err);
        reject(err);
  		} else {
  			console.log('Successfully connected to MongoDb');
  			_db = db;
        resolve(db);
  		}
  	});
  });
}

function getDb() {
  return _db;
}


function zeroes(size) {
  // create array of 0's
  return Array.apply(null, Array(size)).map((v,i) => 0);
}
function range(size) {
  // create array from 0 -> size-1
  return Array.apply(null, Array(size)).map((v,i) => i);
}

function getCollectionName(colors, spaces) {
  return `conciseC${colors}S${spaces}`;
}

function convertGameToDb(arr, colors) {
  return arr.map(decimal => decimal.toString(colors)).join('');
}

function convertDbToGame(str, colors) {
  return str.split('').map(char => parseInt(char, colors));
}
