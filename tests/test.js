/* jshint esversion: 8 */
var request = require('supertest');
var expect = require('expect');
var server = require("./index"),
  io = require("socket.io-client"),
  ioOptions = {
    transports: ["websocket"],
    forceNew: true,
    reconnection: false
  },
  testMsg = "Mensaje socket",
  sender,
  receiver;
var app = require('../app');
// Datos como jey y value generados al azar
let numbers = "0123456789";
let caracteres = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let text;
let keyUnique = 'key';
for (let i=0; i<5; i++) {
  keyUnique +=numbers.charAt(Math.floor(Math.random()*numbers.length)); 
}
for (let i=0; i<10; i++) {
  text +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
} 

describe("Conexion y envios de mensajes de socket", function() {
  beforeEach(function(done) {
    //Instancia dos cientes sockets
    sender = io("http://localhost:3001/", ioOptions);
    receiver = io("http://localhost:3001/", ioOptions);
    done();
  });

  afterEach(function(done) {
    // Desconecta dos clientes luego de cada test
    sender.disconnect();
    receiver.disconnect();
    done();
  });

  describe("Evento mensaje", function() {
    it("Los clientes deben recibir un mensaje cuando se emite el evento message", function(done) {
      sender.emit("message", testMsg);
      receiver.on("message", function(msg) {
        console.log("subscribed");
        expect(msg).toEqual(testMsg);
        done();
      });
    });
    it("Almacena un valor en redis", function(done) {
      let data = {key: keyUnique, value: text };
      sender.emit("new-message", data);
      receiver.on("messages", function(msg) {
        expect(msg.message).toEqual('OK');
        done();
      });
    });
    it("Intentar almacenar un valor ya existente", function(done) {
      let data = {key: keyUnique, value: text };
      sender.emit("new-message", data);
      receiver.on("messages", function(msg) {
        expect(msg.message).toEqual('La clave existe, no se pudo agregar los valores');
        done();
      });
    });
  });
});

/** GET VALORES */
describe('GET valores por key', () => { 
	it('GET valores por key existente', done => {
		let path = '/key/'+keyUnique;
		request(app)
		.get(path)
		.set('Accept', 'application/json')
		.expect(200)
		.end((err, res) => {
			if(err) {return done(err);} else {
      expect(res.status).toEqual(200);
			done();
      }
		});
	});
  it('GET valores por key no existente', done => {
		let path = '/key/'+'0000';
		request(app)
		.get(path)
		.set('Accept', 'application/json')
		.expect(200)
		.end((err, res) => {
			if(err) {return done(err);} else {

      expect(res.status).toEqual(200);
			done();
      }
		});
	});
});
describe('Endpoint no existente', () => { 
	it('No existe el endpoint', done => {
		let path = '/enpoint/notfound/';
		request(app)
		.get(path)
		.set('Accept', 'application/json')
		.expect(404)
		.end((err, res) => {
			if(err) {return done(err);} else {
      expect(res.status).toEqual(404);
			done();
      }
		});
	});
});