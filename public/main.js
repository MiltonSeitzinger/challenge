var socket = io.connect('http://localhost:3000');

socket.on('messages', (data) => {
  if(data.message == 'OK') {
    alert('Se agrego un nuevo dato');
    render(data.data);
  } else {
    alert(data.message);
  }
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
    value: document.getElementById('value').value
  };
  if(!message.key || !message.value) {
    alert("Debe rellenar todos los campos");
  } else {
    socket.emit('new-message', message);
  }
    return false;
}