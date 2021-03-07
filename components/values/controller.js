var { getValueByKey } = require('../../redis/controlleRedis');

function getValueKey(key) {
  return new Promise((resolve, reject) => {
    getValueByKey(key)
    .then((value) => {
      resolve(value)
    })
    .catch((err) =>{
      reject(err);
    })
  })
}

module.exports = {
  getValueKey: getValueKey
}