
const app = require('express')(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log('Transmisión iniciada');
});

app.get('/live', (req, res) => res.sendFile(__dirname + '/public/client.html') );

app.get('/', (req, res) => res.sendFile(__dirname + '/public/server.html') );

io.on('connection', (socket) => {
    socket.on('streaming', (img) => {
        io.emit('watching', img);
        console.log(img);
    });
});