/* jshint esversion: 8 */
var values = require('./components/values/network');

/**
 * Los diferentes endpoint del servicios
 ** / -> raiz principal donde se renderiza el html que tiene el formulario de carga de datos.
 ** /key -> llama al componente values, el cual es para obtener los datos a traves del parametro key 
 ** * -> cualquier otra error lanza un error 404
 */
var router = function(app) {
  app.get('/', (req, res) => {
    res.render("main");
  });
  app.use('/key', values);

  app.get('*', (req, res) => {
    res.status(404).render("status404");
  });
};

module.exports = router;