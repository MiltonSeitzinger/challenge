/* jshint esversion: 8 */

var express = require('express');
var router = express.Router();
var controller = require('./controller');

router.get('/:key',(req, res) => {
  let key = req.params.key
  if(key) {
    controller.getValueKey(key)
    .then((value) => {
      if(value) {
        res.status(200).render("values", { key: key, value: value });
      } else {
        res.status(200).render("values",{ key: key });
      }
    })
    .catch(err => {
      console.log('Hubo un error nae: ', err);
      res.status(500).send({ err: err });
    })
  }
});

module.exports = router;