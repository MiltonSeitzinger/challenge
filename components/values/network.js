/* jshint esversion: 8 */

var express = require('express');
var router = express.Router();
var controller = require('./controller');

/**
 * endpoint GET el cual llama al controlador pasando como parametro la key.
 * Si la consulta la hace correctamente renderiza el html correspondiente.
 * Si hay un error en el servidor retorna un status 500 
 */
router.get('/:key',(req, res) => {
  let key = req.params.key;
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
    });
  }
});

module.exports = router;