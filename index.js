const express = require('express'); //for web server
const fs = require('fs'); //file system
const https = require('https'); //for SSL ussage
const app = express();
const PORT = 8443;
const bodyParser = require('body-parser'); //For get access to the varibles post, get, put, etc
//const redis = require('socket.io-redis'); //if server redis is installed 

//creating the secure connection
const server = https.createServer({
    cert: fs.readFileSync('fullchain.pem'),
    key: fs.readFileSync('privkey.pem')
}, app).listen(PORT, function () {
    console.log(`Server running: https://yourdomain.com:${PORT}`);
});

const io = require('socket.io')(server, {
    cors: {
        origin: '*' //acept all origins
    }
});

//const adapter = io.adapter(redis({host: '127.0.0.1', port: 6379})); //only for redis server

io.on('connection', function (socket) {
    //const sessionID = socket.id;
    //console.log(sessionID);
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});

app.get('/', function (req, res) {
    res.send('');
//    res.sendFile(__dirname + '/index.html'); //use it if you need serve some html file
});