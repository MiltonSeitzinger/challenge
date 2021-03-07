var redis = require('redis');
var client = redis.createClient(PORT, HOST);
var { PORT, HOST } = require('../config/config-redis');

/**
 * Conexion con redis
 */

client.on('connect', () => {
    console.log('Conectado con redis');
})

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
          console.log('dataStored: ', dataStored)
          resolve(dataStored);
        }
      })
    })
    .catch((err) => {
      reject(err);
    })
  })
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
      resolve(results)
    });
  })
}
module.exports = {
  addData: addData,
  exists: ifExists
}