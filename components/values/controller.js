/* jshint esversion: 8 */
var { getValueByKey } = require('../../redis/controlleRedis');

/**
 * @function getValueKey -> llama al metodo de redis para obtener el valor a traves de la key
 * @param {*} key 
 */
function getValueKey(key) {
  return new Promise((resolve, reject) => {
    getValueByKey(key)
    .then((value) => {
      resolve(value);
    })
    .catch((err) =>{
      reject(err);
    });
  });
}

module.exports = {
  getValueKey: getValueKey
};