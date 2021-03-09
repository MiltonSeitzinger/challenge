/* jshint esversion: 8 */
var redis = require('redis');
var { PORT, HOST } = require('../config/config-redis');
var client = redis.createClient({host: 'redis'});

/**
 * Conexion con redis
 */

client.on('connect', () => {
    console.log('Conectado con redis');
});

/**
 * function addData -> almacena clave-valor proveniente del cliente en redis.
 * @param data -> clave-valor
 * @return los datos almacenados o un error.
 */
function addData(data) {
  return new Promise((resolve, reject) => {
    ifExists(data.key)
    .then((exist) => {
      if(exist === 1) {
        resolve('La clave existe, no se pudo agregar los valores');
        return false;
      }
      client.set(data.key, data.value, (err, dataStored) => {
        if (err) {
          reject(err);
          return false;
        } else {
          console.log('dataStored: ', dataStored);
          resolve(dataStored);
        }
      });
    })
    .catch((err) => {
      reject(err);
    });
  });
}

/**
 * 
 * @param key
 * @return si existe o no la key. 
 */
function ifExists(key){
  return new Promise ((resolve, reject) => {
    client.exists(key, (err, results) => {
      if(err) {
        reject(err);
        return false;
      }
      resolve(results);
    });
  });
}

/**
 * @function getValueByKey -> obtiene el valor de la key
 * @param key
 * @return -> data by key
 */
function getValueByKey(key){
  return new Promise ((resolve, reject) => {
    if(key) {
      client.get(key, (err, value) => {
        if (err) {
          reject(err);
          return false;
        }
        resolve(value);
      });
    }
  });
}
module.exports = {
  addData: addData,
  exists: ifExists,
  getValueByKey: getValueByKey
};