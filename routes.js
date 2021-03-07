var values = require('./components/values/network');

var router = function(app) {
  app.get('/', (req, res) => {
    res.render("main");
  })
  app.use('/key', values);

  app.get('*', (req, res) => {
    res.status(404).render("status404");
  })
}

module.exports = router;