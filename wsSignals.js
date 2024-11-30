function wsSignals(ws, event, body, game) {
    // console.log(event);
    game.savePreviousValues();
    switch (event) {
        case "sendPlayerId":
            const player = `player${body.playerId}`;
            game[player].ws = ws;
            game.messages.push({
                playerId: 0,
                message: `${player} подключился к игре!`,
                key: game.messages.length,
            });
            sendAllMessages(game);
            sendGameState(game);
            break;
        case "sendMessage":
            body.key = game.messages.length;
            game.messages.push(body);
            sendAllMessages(game);
            break;
        case "sendIdPlayingCard":
            const playAgain = game.playCard(+body.playingCardId, +body.playerId);
            game.pickCards(body.playerId);
            if (!playAgain)
                game.endStep();
            sendGameState(game);
            sendAllMessages(game);
            break;
        case "sendIdDroppingCard":
            game.dropCard(+body.droppingCardId, +body.playerId);
            game.endStep();
            sendGameState(game);
            break; Ï
    };
};

function sendAllMessages(game) {
    let wsMessage = {};
    wsMessage.event = "sendAllMessages";
    wsMessage.body = game.messages.slice(-8);
    if (game.player1.ws) {
        game.player1.ws.send(JSON.stringify(wsMessage));
    }
    if (game.player2.ws)
        game.player2.ws.send(JSON.stringify(wsMessage));
};

function playerHandToSend(game, playerId) {
    let playerHand = [];
    const player = `player${playerId}`;
    game[player].modifyHandByPlayerArmory.forEach(({ ...card }) => {
        delete card.play;
        playerHand.push(card);
    })
    return (playerHand);
}



function sendGameState(game) {
    game.modifyHandsByPlayersArmoryes();
    game.setItemsDescription();

    const wsMessagePlayer1Armory = {};
    wsMessagePlayer1Armory.event = "sendPlayerArmory";
    wsMessagePlayer1Armory.body = {
        playerId: 1,
        health: game.player1.health,
        healthChange: game.player1.health - game.player1.healthPrevious,
        armor: game.player1.armor,
        armorChange: game.player1.armor - game.player1.armorPrevious,
        head: game.player1.head,
        weapon: game.player1.weapon,
        body: game.player1.body,
        boots: game.player1.boots,
        chaos: {
            hits: game.player1.magics.chaos.hits,
            lvl: game.player1.magics.chaos.lvl + game.player1.chaosLvlPlus,
            hitsChange: game.player1.magics.chaos.hits - game.player1.magics.chaos.hitsPrevious,
        },
        earth: {
            hits: game.player1.magics.earth.hits,
            lvl: game.player1.magics.earth.lvl + game.player1.earthLvlPlus,
            hitsChange: game.player1.magics.earth.hits - game.player1.magics.earth.hitsPrevious,
        },
        water: {
            hits: game.player1.magics.water.hits,
            lvl: game.player1.magics.water.lvl + game.player1.waterLvlPlus,
            hitsChange: game.player1.magics.water.hits - game.player1.magics.water.hitsPrevious,
        },
        dark: {
            hits: game.player1.magics.dark.hits,
            lvl: game.player1.magics.dark.lvl + game.player1.darkLvlPlus,
            hitsChange: game.player1.magics.dark.hits - game.player1.magics.dark.hitsPrevious,
        },
        magicSpeciality: game.player1.magicSpeciality,
        magicSpecialityLvl: game.player1.magicSpecialityLvl,
    };

    const wsMessagePlayer2Armory = {}
    wsMessagePlayer2Armory.event = "sendPlayerArmory";
    wsMessagePlayer2Armory.body = {
        playerId: 2,
        health: game.player2.health,
        healthChange: game.player2.health - game.player2.healthPrevious,
        armor: game.player2.armor,
        armorChange: game.player2.armor - game.player2.armorPrevious,
        head: game.player2.head,
        weapon: game.player2.weapon,
        body: game.player2.body,
        boots: game.player2.boots,
        chaos: {
            hits: game.player2.magics.chaos.hits,
            lvl: game.player2.magics.chaos.lvl + game.player2.chaosLvlPlus,
            hitsChange: game.player2.magics.chaos.hits - game.player2.magics.chaos.hitsPrevious,
        },
        earth: {
            hits: game.player2.magics.earth.hits,
            lvl: game.player2.magics.earth.lvl + game.player2.earthLvlPlus,
            hitsChange: game.player2.magics.earth.hits - game.player2.magics.earth.hitsPrevious,
        },
        water: {
            hits: game.player2.magics.water.hits,
            lvl: game.player2.magics.water.lvl + game.player2.waterLvlPlus,
            hitsChange: game.player2.magics.water.hits - game.player2.magics.water.hitsPrevious,
        },
        dark: {
            hits: game.player2.magics.dark.hits,
            lvl: game.player2.magics.dark.lvl + game.player2.darkLvlPlus,
            hitsChange: game.player2.magics.dark.hits - game.player2.magics.dark.hitsPrevious,
        },
        magicSpeciality: game.player2.magicSpeciality,
        magicSpecialityLvl: game.player2.magicSpecialityLvl,
    };
    // console.log("wsMessagePlayer1Armory:", wsMessagePlayer1Armory.body);
    
    for (let i = 1; i <= 2; i++) {
        const player = `player${i}`;

        const wsMessageHandPlayer = {};
        wsMessageHandPlayer.event = "sendPlayerHand";
        wsMessageHandPlayer.body = playerHandToSend(game, i);

        const wsMessageGameProcess = {};
        wsMessageGameProcess.event = "sendGameProcess";
        wsMessageGameProcess.body = game.processCards;

        const wsMessageStepPlayerId = {};
        wsMessageStepPlayerId.event = "sendStepPlayerId";
        wsMessageStepPlayerId.body = game.stepPlayerId;

        if (game[player].ws) {
            game[player].ws.send(JSON.stringify(wsMessagePlayer1Armory));
            game[player].ws.send(JSON.stringify(wsMessagePlayer2Armory));
            game[player].ws.send(JSON.stringify(wsMessageGameProcess));
            game[player].ws.send(JSON.stringify(wsMessageStepPlayerId));
            game[player].ws.send(JSON.stringify(wsMessageHandPlayer));
        }
    }
};

module.exports.wsSignals = wsSignals;