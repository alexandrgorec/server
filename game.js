const { deck } = require("./deck");

const startHealth = 50;
const startArmor = 30;
const startCountHandCard = 5;
const startStepPlayerId = 1;
const startMagicHits = 25;
const startMagicLvl = 2;



class Game {
    constructor(room) {
        this.room = room;
        this.start();
        this.savePreviousValues();
    };
    endStep() {
        this.stepPlayerId = 1 === this.stepPlayerId
            ? 2
            : 1;
        this.startStep = true;
        this.playStepItemEffects();
    };
    playStepItemEffects() {
        const player = `player${this.stepPlayerId}`;
        const playerEnemy = this.stepPlayerId === 1
            ? "player2"
            : "player1";
        ["chaos", "earth", "water", "dark"].forEach(magic => {
            const hitsChange = this[player].magics[magic].lvl + this[player][`${magic}LvlPlus`];
            if (hitsChange < 1)
                this[player].magics[magic].hits += 1; // минимальный прирост сил должен быть всегда
            else
                this[player].magics[magic].hits += hitsChange;
        })
        if (this[player].stepPlayerEnemyDamage > 0) {
            if (this[playerEnemy].armor <= this[player].stepPlayerEnemyDamage) {
                this[playerEnemy].health -= this[player].stepPlayerEnemyDamage - this[playerEnemy].armor;
                this[playerEnemy].armor = 0;
            } else {
                this[playerEnemy].armor -= this[player].stepPlayerEnemyDamage;
            }
        }
        if (this[player].stepPlayerArmorChange > 0)
            this[player].armor += this[player].stepPlayerArmorChange;
    };
    pickCards(playerId) {
        const minCountMagicSpecialityCardInHand = 2;
        const player = `player${playerId}`;
        let changedCountHandCard = this[player].countHandCards + this[player].countHandCardPlus;
        if (changedCountHandCard <= 2)
            changedCountHandCard = 2; // ограничение на МИНИМАЛЬНОЕ количество карт в руке = 2

        while (this[player].handCardsId.length < changedCountHandCard) {
            this.modifyHandsByPlayersArmoryes();
            if (this.deck.map(([cardStatus, noUseValue]) => cardStatus).includes("inDeck") === false) {
                this.shuffleDeck();
                this.messages.push({
                    playerId: 0,
                    message: "Колода кончилась, перемешаем!",
                    key: this.messages.length,
                });
            }
            let countMagicSpecialityCardInHand = this[player].modifyHandByPlayerArmory.filter( card => card.magic === this[player].magicSpeciality).length;
            if ((countMagicSpecialityCardInHand < minCountMagicSpecialityCardInHand) && (this[player].magicSpeciality !='none')) {
                this.deck.find(([cardStatus, card], index, deck) => {
                    if (cardStatus === "inDeck" && card.magic === this[player].magicSpeciality) {
                        deck[index][0] = "inGame";
                        this[player].handCardsId.push(card.id);
                        return (true);
                    }
                })
            } else {
                this.deck.find(([cardStatus, card], index, deck) => {
                    if (cardStatus === "inDeck") {
                        deck[index][0] = "inGame";
                        this[player].handCardsId.push(card.id);
                        return (true);
                    }
                })
            }
        }
    };
    playCard(playingCardId, playerId) {
        const player = `player${playerId}`;
        const playerEnemy = playerId === 1
            ? "player2"
            : "player1";
        const [, card] = this.deck.find(([cardStatus, cardInDeck], index, deck) => {
            if (playingCardId == cardInDeck.id) {
                deck[index][0] = "outGame";
                return (true);
            }
        })
        let modifedCard = null;
        this[player].modifyHandByPlayerArmory.find(cardInHand => {
            if (playingCardId === cardInHand.id) {
                modifedCard = cardInHand;
                return (true);
            }
        })
        if (card != null && modifedCard != null) {
            if (this.startStep) {
                this.startStep = false;
                this.processCards = [];
            }
            this.processCards.push(modifedCard);
            this[player].handCardsId = this[player].handCardsId.filter(id => playingCardId != id);
            this[player].magics[modifedCard.magic].hits -= modifedCard.cost;
            modifedCard.play(this, player, playerEnemy, modifedCard.value);
            return (modifedCard.playAgain);
        }
    };
    dropCard(droppingCardId, playerId) {
        const player = `player${playerId}`;
        const [, card] = this.deck.find(([cardStatus, cardInDeck], index, deck) => {
            if (droppingCardId == cardInDeck.id) {
                deck[index][0] = "outGame";
                return (true);
            }
        })
        let modifedCard = null;
        this[player].modifyHandByPlayerArmory.find(cardInHand => {
            if (droppingCardId === cardInHand.id) {
                modifedCard = { ...cardInHand };
                modifedCard.dropped = true;
                return (true);
            }
        })
        if (card != null && modifedCard != null) {
            if (this.startStep) {
                this.startStep = false;
                this.processCards = [];
            }
            // console.log(player);
            this.processCards.push(modifedCard);
            this[player].handCardsId = this[player].handCardsId.filter(id => droppingCardId != id);
            this.modifyHandsByPlayersArmoryes();
            this.pickCards(playerId);
        }
    };
    shuffleDeck() {
        this.deck.forEach(([cardStatus,], index, deck) => {
            if (cardStatus == "outGame")
                deck[index][0] = "inDeck";
        });
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    };
    start() {
        this.stepPlayerId = startStepPlayerId;
        this.startStep = true;
        for (let i = 1; i <= 2; i++) {
            const player = `player${i}`;
            this[player] = {
                handCardsId: [],
                countHandCards: startCountHandCard,
                modifyHandByPlayerArmory: [],
                health: startHealth,
                armor: startArmor,
                head: {
                    id: "defaultHead",
                    name: "Тупая лысая башка",
                    description: "Зимой надо надевать шапку",
                },
                weapon: {
                    id: "defaultWeapon",
                    name: "Уродливая рука",
                    description: "лучше чем твоя бывшая",
                },
                body: {
                    id: "defaultBody",
                    name: "Фотка из интернета",
                    description: "а твой пивной живот смотрелся бы лучше",
                },
                boots: {
                    id: "defaultBoots",
                    name: "Запущенные ноги",
                    description: "мама разве не говорила тебе надевать носки?",
                },
                magics: {
                    chaos: {
                        hits: startMagicHits,
                        lvl: startMagicLvl,
                    },
                    earth: {
                        hits: startMagicHits,
                        lvl: startMagicLvl,
                    },
                    water: {
                        hits: startMagicHits,
                        lvl: startMagicLvl,
                    },
                    dark: {
                        hits: startMagicHits,
                        lvl: startMagicLvl,
                    },
                },
                magicSpeciality: "none",
                magicSpecialityLvl: 0,
                get chaosEffectsPlus() {
                    let result = 0;
                    ["head", "weapon", "body", "boots"].forEach(item => {
                        this[item].chaosEffectsPlus == undefined ? "" : result += this[item].chaosEffectsPlus;
                    })
                    return (result);
                },
                get earthEffectsPlus() {
                    let result = 0;
                    ["head", "weapon", "body", "boots"].forEach(item => {
                        this[item].earthEffectsPlus == undefined ? "" : result += this[item].earthEffectsPlus;
                    })
                    return (result);
                },
                get waterEffectsPlus() {
                    let result = 0;
                    ["head", "weapon", "body", "boots"].forEach(item => {
                        this[item].waterEffectsPlus == undefined ? "" : result += this[item].waterEffectsPlus;
                    })
                    return (result);
                },
                get darkEffectsPlus() {
                    let result = 0;
                    ["head", "weapon", "body", "boots"].forEach(item => {
                        this[item].darkEffectsPlus == undefined ? "" : result += this[item].darkEffectsPlus;
                    })
                    return (result);
                },
                get chaosLvlPlus() {
                    let result = 0;
                    ["head", "weapon", "body", "boots"].forEach(item => {
                        this[item].chaosLvlPlus == undefined ? "" : result += this[item].chaosLvlPlus;
                    })
                    return (result);
                },
                get earthLvlPlus() {
                    let result = 0;
                    ["head", "weapon", "body", "boots"].forEach(item => {
                        this[item].earthLvlPlus == undefined ? "" : result += this[item].earthLvlPlus;
                    })
                    return (result);
                },
                get waterLvlPlus() {
                    let result = 0;
                    ["head", "weapon", "body", "boots"].forEach(item => {
                        this[item].waterLvlPlus == undefined ? "" : result += this[item].waterLvlPlus;
                    })
                    return (result);
                },
                get darkLvlPlus() {
                    let result = 0;
                    ["head", "weapon", "body", "boots"].forEach(item => {
                        this[item].darkLvlPlus == undefined ? "" : result += this[item].darkLvlPlus;
                    })
                    return (result);
                },
                get countHandCardPlus() {
                    let result = 0;
                    ["head", "weapon", "body", "boots"].forEach(item => {
                        this[item].countHandCardPlus == undefined ? "" : result += this[item].countHandCardPlus;
                    })
                    return (result);
                },
                get stepPlayerEnemyDamage() {
                    let result = 0;
                    ["head", "weapon", "body", "boots"].forEach(item => {
                        this[item].stepPlayerEnemyDamage == undefined ? "" : result += this[item].stepPlayerEnemyDamage;
                    })
                    if (result < 0) result = 0;
                    return (result);
                },
                get stepPlayerArmorChange() {
                    let result = 0;
                    ["head", "weapon", "body", "boots"].forEach(item => {
                        this[item].stepPlayerArmorChange == undefined ? "" : result += this[item].stepPlayerArmorChange;
                    })
                    if (result < 0) result = 0;
                    return (result);
                },

            };
        }
        this.processCards = [];
        this.messages = [];
        this.deck = deck.map(([cardStatus, { ...card }]) => [cardStatus, card]);
        const player1Id = 1;
        const player2Id = 2;
        this.shuffleDeck();
        this.pickCards(player1Id);
        this.pickCards(player2Id);
    };
    checkLoosers() {
        let loosers = null;
        if ((this.player1.health <= 0) || (this.player2.health <= 0)) {
            loosers = {};
            if (this.player1.health <= 0) loosers.player1 = true;
            if (this.player2.health <= 0) loosers.player2 = true;
        }
        return (loosers);
    };
    savePreviousValues() {
        for (let i = 1; i <= 2; i++) {
            const player = `player${i}`;
            this[player].magics.chaos.hitsPrevious = this[player].magics.chaos.hits;
            this[player].magics.earth.hitsPrevious = this[player].magics.earth.hits;
            this[player].magics.water.hitsPrevious = this[player].magics.water.hits;
            this[player].magics.dark.hitsPrevious = this[player].magics.dark.hits;
            this[player].healthPrevious = this[player].health;
            this[player].armorPrevious = this[player].armor;
        }
    }
    modifyHandsByPlayersArmoryes() {
        for (let i = 1; i <= 2; i++) {
            const player = `player${i}`;
            this[player].modifyHandByPlayerArmory = [];
            this[player].handCardsId.forEach(handCardId => {
                let [, { ...cardForChangeAndPush }] = this.deck.find(([noUseValue, card]) => {
                    if (handCardId === card.id)
                        return (true);
                });
                cardForChangeAndPush.canPlay = false;
                if (cardForChangeAndPush.canIncrease) {
                    const coefficientMultiplier = 0.25;
                    let specialityMultiplier = 1;
                    if ((cardForChangeAndPush.magic == this[player].magicSpeciality)) {
                        specialityMultiplier += (this[player].magicSpecialityLvl * coefficientMultiplier);
                        cardForChangeAndPush.cost = Math.floor(cardForChangeAndPush.cost * specialityMultiplier);
                    }
                    cardForChangeAndPush.value = Math.floor(cardForChangeAndPush.value * (specialityMultiplier + (0.01 * this[player][`${cardForChangeAndPush.magic}EffectsPlus`])));
                }
                if (cardForChangeAndPush.cost <= this[player].magics[cardForChangeAndPush.magic].hits)
                    cardForChangeAndPush.canPlay = true;
                cardForChangeAndPush.description = cardForChangeAndPush.description();
                this[player].modifyHandByPlayerArmory.push(cardForChangeAndPush);
            })
        }
    };
    setItemsDescription() {
        for (let i = 1; i <= 2; i++) {
            const player = `player${i}`;
            ["head", "weapon", "body", "boots"].forEach(item => {
                let result = "";
                if (this[player][item].item) {
                    [["chaos", "хаоса"], ["earth", "земли"], ["water", "воды"], ["dark", "тьмы"]].forEach(([magic, magicRus]) => {
                        if (this[player][item][`${magic}EffectsPlus`]) {
                            this[player][item][`${magic}EffectsPlus`] > 0 ? result += " +" : "";
                            result += this[player][item][`${magic}EffectsPlus`];
                            result += `% эффектам ${magicRus}\n`;
                        }
                        if (this[player][item][`${magic}LvlPlus`]) {
                            this[player][item][`${magic}LvlPlus`] > 0 ? result += " +" : "";
                            result += this[player][item][`${magic}LvlPlus`];
                            result += ` магии ${magicRus}\n`;
                        }
                    })
                    if (this[player][item].countHandCardPlus) {
                        this[player][item].countHandCardPlus > 0 ? result += `+` : "";
                        result += `${this[player][item].countHandCardPlus} к количеству карт в руке\n`;
                    }

                    if (this[player][item].stepPlayerArmorChange > 0)
                        result += `${this[player][item].stepPlayerArmorChange} к щиту каждый ход\n`

                    if (this[player][item].stepPlayerEnemyDamage > 0)
                        result += `${this[player][item].stepPlayerEnemyDamage} урона врагу каждый ход\n`

                    this[player][item].description = result;
                }
            })
        }
    };
};

module.exports.Game = Game;

