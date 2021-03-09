/* jshint esversion: 8 */
var redisStore= require('../redis/controlleRedis');

module.exports =(io) => {
  /**
  ** Realiza la conexion con el nuevo cliente que se conecta. 
  */
  io.on('connection', (socket) =>{
    console.log('New socket connected: ', socket.id);


    /**
    ** Espera el evento 'new-message' para agregar los datos a redis.
    ** Si guardo correctamente notifica al cliente.
    ** Si hubo un error al guardar, notificara al cliente. 
    */
    socket.on('new-message', async (data) => {
      redisStore.addData(data)
      .then((store) => {
        socket.emit('messages', 
        {message: store, data:data}
        );
      })
      .catch((err) => {
        console.log(err);
      });
    });


    /**
    ** Realiza la desconecion del socket. 
    */
    socket.on('disconnect', () =>{
      console.log('New socket disconnect: ', socket.id);
    });
  
  });
};