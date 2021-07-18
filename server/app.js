const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server,{
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
  }
});

const router=require("./router");
const {addUser,removeUser,getUser}=require('./users.js');

app.use(router);

io.on('connection', (socket) => {
  console.log("User joined");

  socket.on('join',({name,room})=>{
  const {error,user}=addUser({id:socket.id,name,room});

  
  socket.emit('message',{user:'admin', text : `${user.name}, welcome to the room ${user.room} `});
  socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined !`});
  socket.join(user.room);
  });


  socket.on('sendMessage',(message)=>{
    const user=getUser(socket.id);
    io.to(user.room).emit('message',{user:user.name,text:message});
  })

  /** 
  // Check if room exists
  socket.on('room-id', msg => {
      let exists = rooms.includes(msg)
      socket.emit('room-check', exists)

  })

  // If code changes, broadcast to sockets
  socket.on('code-change', msg => {
      socket.broadcast.to(socket.room).emit('code-update', msg)

  })

  socket.on('created-room', msg => {
      console.log("CREATED-ROOM " + msg)
      rooms.push(msg)
  })


  // If language changes, broadcast to sockets
  socket.on('language-change', msg => {
      io.sockets.in(socket.room).emit('language-update', msg)
  })

*/
  // If code changes, broadcast to sockets
  socket.on('code-change', msg => {
    socket.broadcast.to(user.room).emit('code-update', msg);
    console.log(msg);

})
  
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
  
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      }
    })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));