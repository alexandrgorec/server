const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const wsServer = new WebSocket.Server({port: 9000});
import Server from "socket.io";

const player1 = {};
const player2 = {};

const io = new Server(9000);
io.on("connection", (socket) => {
    socket.emit("hello","world");
    socket.on("userEventServer", (message) => {
        console.log(message);
    })
})

// wsServer.on('connection', (ws) => {
//     let i=0;
//     wsServer.clients.forEach( () => i++);
//     console.log(i);
//     ws.on('message', (message) =>  {
//         ws.binaryType = "arraybuffer";
//         let getMessage = JSON.parse(message); 
//         console.log(getMessage);
//     });
//     ws.on('close', () => console.log("connection lost"))
//     ws.send("sadasd");
// });




let messages = [

];

app.use( cors() );
app.use(bodyParser.json());

app.post("/sendmessage", function(request, response){
    console.log("have-contacts");
    console.log(request.body);
    messages.push(request.body);
    response.send(messages);
});

app.get("/", function(request, response){
    console.log("have-contacts");
    response.send("server is started!");
});

app.listen(3001);