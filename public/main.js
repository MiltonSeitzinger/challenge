var socket = io.connect('http://localhost:3000');

socket.on('messages', (data) => {
  alert('Nuevo dato agregado');
  render(data);
})

/**
** Renderiza los datos en el archivo html.
*/
function render (data) {
  var html = `<div>
              <strong>${data.key}</strong>:
              <em>${data.value}</em>
            </div>`;
  document.getElementById('messages').innerHTML = html;
  restartValue();
}

/**
** Limpia los datos del formulario 
*/
function restartValue(){
  document.getElementById('key').value = ''
  document.getElementById('value').value = ''
}

/**
** Crea un nuevo mensaje con los datos del formulario y los envia por socket. 
*/
function addMessage() {
  var message = {
    key: document.getElementById('key').value,
    value: document.getElementById('value').value//.split(',')
  };
  if(!message.key || !message.value) {
    alert("Debe rellenar todos los campos");
  } else {
    let values = []
    if(message.value.includes(',')){
      message.value = message.value.split(',')
      message.value.forEach(element => {
        values.push(element.trim());
      });
    message.value = values;
    }
    socket.emit('new-message', message);
  }
    return false;
}