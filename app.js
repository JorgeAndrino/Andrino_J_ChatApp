// initialize an express app and set it up 
const express = require('express');
const app = express();
const io = require('socket.io')();

// some config stuff
const port = process.env.PORT || 3000;

// tell our app to use the public folder for static files
app.use(express.static('public'));

// instantiate the only route we need
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/views/index.html');
});

// create server variable for socket.io to use
const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

// plug in the chat app package
io.attach(server);

var numUsers= 0;

io.on('connection', function(socket){
    //See how many users are online
    numUsers++;

    io.emit('userCount', { users: numUsers });

    console.log('a user has connected', numUsers);

    socket.emit('connected', {sID: `${socket.id}`, message: 'new connection'});

    //io.emit('joined', { notifications: "new user joined" });

    // listen for incoming messages
    socket.on('chat message', function(msg) {
        console.log('message', msg, 'socket', socket.id);

        //send a message to every connected client
        io.emit('chat message', { id: `${socket.id}`, message: msg });
    })

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
        numUsers--;
      io.emit('userCount', { users: numUsers });
    });

});
