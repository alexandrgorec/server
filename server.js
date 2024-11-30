const express = require('express');
const app = express();
const { WebSocket } = require('ws');
const wsServer = new WebSocket.Server({ port: 9000 });
const { Game } = require("./game");
const { wsSignals } = require("./wsSignals");
const fs = require('fs');

const path = require('path');
const STATIC_PATH = path.join(__dirname, './build');
app.use(express.static(STATIC_PATH));
console.log("SERVER STARTED");

const roomId = 999;
let gameRoom = new Game(roomId);

wsServer.on('connection', (ws) => {
    // console.log("have connection")
    ws.on('message', (message) => {
        ws.binaryType = "arraybuffer";
        let getMessage = JSON.parse(message);
        // console.log(getMessage);
        wsSignals(ws, getMessage.event, getMessage.body, gameRoom);
        let loosers = gameRoom.checkLoosers();
        if (loosers) {
            const wsMessage = {};
            wsMessage.event = "sendCheckEndGame";
            wsMessage.body = loosers;
            let ws1 = null;
            let ws2 = null;
            if (gameRoom.player1.ws) {
                gameRoom.player1.ws.send(JSON.stringify(wsMessage));
                ws1 = gameRoom.player1.ws;
            }
            if (gameRoom.player2.ws) {
                gameRoom.player2.ws.send(JSON.stringify(wsMessage));
                ws2 = gameRoom.player2.ws;
            }
            gameRoom = new Game(roomId);
            gameRoom.player1.ws = ws1;
            gameRoom.player1.ws = ws2;
        }
    });
    ws.on('close', () => {
        if (ws === gameRoom.player1.ws) {
            gameRoom.messages.push({
                playerId: 0,
                message: `player1 отключился от игры!`,
                key: gameRoom.messages.length,
            });
        }
        if (ws === gameRoom.player2.ws) {
            gameRoom.messages.push({
                playerId: 0,
                message: `player2 отключился от игры!`,
                key: gameRoom.messages.length,
            });
        }
    })
});

app.get('/', (req, res) => {
    res.sendFile(path.join(STATIC_PATH, 'index.html'));
});

app.get("/img", function (request, response) {
    fs.readFile(`./imgs/${request.query.img}`, function (error, data) {
        if (error) {
            response.statusCode = 404;
            response.end('Resourse not found!');
        } else {
            response.end(data);
        }
    });
});



app.listen(3001);
