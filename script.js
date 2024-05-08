const socket = io('http://localhost:8000');

const form = document.getElementById('form');
const messageInput = document.getElementById('messageInput')
const messageContainer = document.querySelector('#messageContainer')

const appendLeft = (data) => {
    const messageElement = document.createElement('div')
    messageElement.classList.add('my-1', 'inline', 'flex', 'items-center', 'float-start', 'clear-both')
    messageElement.innerHTML = `<p class=" underline text-xs">${data.name}</p>&nbsp;&nbsp;<p class="px-4 py-2 text-slate-300 rounded-lg bg-slate-600 ">${data.message}</p>`
    messageContainer.appendChild(messageElement)
}
const appendRight = (data) => {
    const messageElement = document.createElement('div')
    messageElement.classList.add('my-1', 'inline', 'flex', 'items-center', 'float-end', 'clear-both')
    messageElement.innerHTML = ` <p class="px-4 py-2 text-slate-300 rounded-lg bg-slate-600">${data.message}</p>&nbsp;&nbsp<p class=" underline text-xs">${data.name}</p>`
    messageContainer.appendChild(messageElement)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = messageInput.value;
    data.name=`you`;
    data.message=message
    appendRight(data);
    socket.emit('send', message)
    messageInput.value = ''
})

const data = {name} 
data.name = prompt("enter Your name");
data.message = `${data.name} joined!`

socket.emit('new-user-joined', data)

socket.on('user-joined', data => {
    appendLeft(data)
})
socket.on('receive', data => {
    appendLeft(data)
})

socket.on('left', data => {
    appendLeft(data)
})
