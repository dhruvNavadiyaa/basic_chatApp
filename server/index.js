const io = require('socket.io')(8000, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});

const users = {}

io.on("connection", socket => {
    socket.on('new-user-joined', data => {
        users[socket.id] = data.name;
        socket.broadcast.emit('user-joined', data);
        // console.log(name)
    })
    socket.on("send", message => {
        socket.broadcast.emit("receive", { message: message, name: users[socket.id] })
    })
    socket.on('disconnect',data =>{
        socket.broadcast.emit("left",{message:`${users[socket.id]} left the chat`,name : users[socket.id]})
        delete users[socket.id]
    })
})