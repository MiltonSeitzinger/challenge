# Challenge

## Como ejecutar 🚀

_Para ejecutar el servidor nos ubicamos en la carpeta del proyecto y ejecutamos el comando:_

```
docker-compose up
```

_Accedemos a http://localhost:3000/ lo cual nos aparecerá un formulario e ingresamos los datos  clave-valor._

_Si la clave existe nos notificara, y si no existe la agregara exitosamente. Este proceso se realiza a través de socket._

_Además podemos acceder a http://localhost:3000/key/:key. Donde key es el parámetro que se pasa a la URL, la cual nos devolverá el valor de la key en caso de que exista._

_Si intentamos acceder a otra URL, nos devolverá un error 404._


## Test ⚙️

_Los tests realizan las siguientes comprobaciones:_
* _Pruebas de conexion y desconexion entre socket-server y socker-client._
* _Envío de mensajes desde el cliente al servidor y viceversa._
* _Envía datos de pruebas a través de socket y lo almacena en redis._
* _Intentar almacenar un valor ya existente._
* _Consulta al endpoint /key/:key con una key existente._
* _Consulta al endpoint /key/:key con una key que no existe._
* _Consulta un endpoint no existente._
* _Verifica si existe errores en el código._

_Para ejecutar los test se realiza con el comando:_

```
docker-compose -f docker-compose.test.yml up
```
## Construido con 🛠️

_Las herramientas que se utilizó para crear este proyecto_

* [NodeJs](https://nodejs.org/en/) - Node. js es un entorno JavaScript que nos permite ejecutar en el servidor, de manera asíncrona, con una arquitectura orientada a eventos y basado en el motor V8 de Google.
* [Redis](https://redis.io/) - Redis es un almacén de estructura de datos en memoria de código abierto.
* [Socket.io](https://socket.io/) - Socket.IO es una biblioteca de JavaScript para aplicaciones web en tiempo real.
* [Grunt](https://gruntjs.com/) - Grunt es un ejecutador de tareas, se utiliza para la automatización de tests. 

### Consideraciones 📄

_En el proyecto es requerido almacenar datos con el par clave-valor, con lo cual se eligió Redis, porque tiene un motor de almacenamiento clave-valor, además ofrece rápidos accesos en la recuperación de los datos y también una alta disponibilidad._
_Redis ofrece almacenamiento en memoria, con lo cual se reinicia el servidor de redis y los datos se pierden, en este caso se supone que los datos almacenados no tienen relevancia, por eso la elección de Redis, si fuera lo contrario habría que tener persistencia en disco, con lo cual redis nos ofrece pero hay otras opciones. En esa situación, se utilizaría a Redis como una capa de almacenamiento caché permitiendo reutilizar eficientemente los datos recuperados previamente y las solicitudes futuras de esos datos se entreguen más rápido de lo que es posible al acceder a la ubicación de almacenamiento principal de los datos como por ejemplo MongoDb._
