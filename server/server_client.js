const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const http = require('http');



const server = http.createServer(app);
// Middlewares
app.use(morgan('dev'));


// Set static folder
app.use(express.static(path.join(__dirname, '../build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});
// --- Routes

// const server = app.listen(app.get('port'), () => console.log('Server On'));


const PORT = process.env.PORT || 3000


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));