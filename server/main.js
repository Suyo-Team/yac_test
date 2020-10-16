const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors')
const moment = require('moment')
const formatMessage = require('./utils/messages');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./utils/users');
// --- Importing routes
const indexRoutes = require('./routes/index');

const server = http.createServer(app);
// Middlewares
app.use(cors())
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// // Set static folder
// app.use(express.static(path.join(__dirname, '../build')));

// // Handles any requests that don't match the ones above
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'));
// });
// --- Routes
app.use('/api', indexRoutes);

// const server = app.listen(app.get('port'), () => console.log('Server On'));


const botName = 'Chat IRC';

const io = socketio(server);

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ id_user, username, room }) => {
        const user = userJoin(socket.id, id_user, username, room);
        let created_at = moment().format('YYYY-MM-DD HH:mm:ss')

        socket.join(user.room);

        // Welcome current user
        socket.emit('message', formatMessage(0, botName, `Welcome to ${user.room}!`, created_at));

        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage(0, botName, `${user.username} has joined the chat`, created_at)
            );

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        let created_at = moment().format('YYYY-MM-DD HH:mm:ss')

        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.id_user, user.username, msg, created_at));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        let created_at = moment().format('YYYY-MM-DD HH:mm:ss')

        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                'message',
                formatMessage(0, botName, `${user.username} has left the chat`, created_at)
            );

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});


const PORT = process.env.PORT || 4000


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));