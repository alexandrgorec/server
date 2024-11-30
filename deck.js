const deck = [
    {
        id: 101,
        value: 1,
        cost: 1,
        canIncrease: true,
        name: "Спичка",
        description() { return `наносит врагу ${this.value} урона` },
        magic: "chaos",
        playAgain: true,
        endStep: false,
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, value)
        }
    },
    {
        id: 102,
        value: 2,
        cost: 2,
        canIncrease: true,
        name: "Плохая проводка",
        description() { return `наносит врагу ${this.value} урона!` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, value)
        }
    },
    {
        id: 103,
        value: 4,
        cost: 4,
        canIncrease: true,
        name: "обвал крыши",
        description() { return `нанести врагу ${this.value} урона` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, value)
        }
    },
    {
        id: 104,
        value: 5,
        cost: 8,
        canIncrease: true,
        name: "Удар молнии",
        description() { return `-${this.value} здоровья врага` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            game[playerEnemy].health -= value;
        }
    },
    {
        id: 105,
        value: 10,
        cost: 10,
        canIncrease: true,
        name: "Огнерог",
        description() { return `нанести врагу ${this.value} урона` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, value)
        }
    },
    {
        id: 106,
        value: 1,
        cost: 7,
        name: "Огненное сердце",
        description() { return `+${this.value} к магии хаоса\nВы теряете 2 здоровья` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            game[player].magics.chaos.lvl += 1;
            game[player].health -= 2;
        }
    },
    {
        id: 107,
        cost: 4,
        name: "Жертва",
        description() { return `-4 здоровья, \n+1 магии хаоса` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            game[player].magics.chaos.lvl += 1;
            game[player].health -= 4;
        }
    },
    {
        id: 108,
        cost: 15,
        name: "Разрушающий луч",
        description() { return `Уничтожает броник (нательник) противника` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            game[playerEnemy].body = {
                name: "Пыль",
                description: "Тут когда то был броник?",
                id: `${this.id}.2`,
                magic: this.magic,
            }
        }
    },
    {
        id: 109,
        value: 8,
        cost: 10,
        canIncrease: true,
        name: "Поджог",
        description() { return `-${valuePercent(50, this.value)} здоровья врага\n ${valuePercent(50, this.value)} урона врагу` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            game[playerEnemy].health -= valuePercent(50, this.value);
            damage(game, playerEnemy, valuePercent(50, this.value));
        }
    },
    {
        id: 110,
        value: 3,
        cost: 3,
        name: "Согревающий костер",
        description() { return `+3 к очкам всех магий` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            game[player].magics.chaos.hits += value;
            game[player].magics.earth.hits += value;
            game[player].magics.water.hits += value;
            game[player].magics.dark.hits += value;
        }
    },
    {
        id: 111,
        value: 20,
        cost: 20,
        canIncrease: true,
        name: "Взрыв",
        description() { return `нанести ${this.value} урона врагу ` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, value);
        }
    },
    {
        id: 112,
        value: 10,
        cost: 8,
        canIncrease: true,
        name: "Кольцо огня",
        description() { return `-${valuePercent(20, this.value)} здоровья врага\n ${valuePercent(50, this.value)} урона врагу` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            game[playerEnemy].health -= valuePercent(50, this.value);
            damage(game, playerEnemy, valuePercent(20, this.value));
        }
    },
    {
        id: 113,
        cost: 10,
        name: "Клетка шредингера",
        description() { return `+1 к магии хаоса` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            game[player].magics.chaos.lvl += 1;
        }
    },
    {
        id: 114,
        value: 10,
        cost: 15,
        name: "Мутация",
        canIncrease: true,
        description() { return `+2 к магии хаоса, вы теряете ${this.value} очков магии тьмы` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            game[player].magics.chaos.lvl += 2;
            lossMagicHits(game, "dark", player, value);
        }
    },
    {
        id: 115,
        value: 10,
        cost: 10,
        canIncrease: true,
        name: "Огненный шар",
        description() { return `нанести ${this.value} урона врагу` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            game[playerEnemy].health -= value;
        }
    },
    {
        id: 116,
        value: 5,
        cost: 1,
        canIncrease: true,
        name: "Взрывная волна",
        description() { return `Нанести ${this.value} урона каждому игроку` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            damage(game, player, value);
            damage(game, playerEnemy, value);
        }
    },
    {
        id: 117,
        value: 10,
        cost: 8,
        canIncrease: true,
        name: "Неизученная материя",
        description() { return `-${this.value} здоровья врага или +${this.value} очков хаоса врагу` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            let result = randomInteger(1, 2);
            if (result == 1) {
                game[playerEnemy].health -= value;
                game.messages.push({
                    playerId: 0,
                    message: `-${value} здоровья врагу!`,
                    key: game.messages.length,
                })
            }
            if (result == 2) {
                game[playerEnemy].magics.chaos.hits += value;
                game.messages.push({
                    playerId: 0,
                    message: `+${value} очков хаоса врагу`,
                    key: game.messages.length,
                })
            }
        }
    },
    {
        id: 201,
        value: 1,
        cost: 1,
        canIncrease: true,
        playAgain: true,
        name: "Плюнуть во врага",
        description() { return `нанести врагу ${this.value} урона` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, value);
        }
    },
    {
        id: 202,
        value: 5,
        cost: 15,
        canIncrease: true,
        name: "Облить из шланга",
        description() { return `Враг получает -1 к магии хаоса и ${this.value} урона` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            lossMagicLvl(game, "chaos", playerEnemy, 1);
            damage(game, playerEnemy, value);
        }
    },
    {
        id: 203,
        value: 3,
        cost: 13,
        canIncrease: true,
        playAgain: true,
        name: "Кислотный дождь",
        description() { return `Враг получает -1 к магии земли и ${this.value} урона` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            lossMagicLvl(game, "earth", playerEnemy, 1);
            damage(game, playerEnemy, value);
        }
    },
    {
        id: 204,
        cost: 10,
        name: "Аквариум",
        description() { return `Вы получаете +1 к магии воды` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            game[player].magics.water.lvl++;
        }
    },
    {
        id: 205,
        cost: 10,
        name: "Снеговик",
        description() { return `Вы получаете +1 к магии воды` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            game[player].magics.water.lvl++;
        }
    },
    {
        id: 206,
        cost: 16,
        name: "Лавина",
        description() { return `Игрок, чей щит больше, теряет его половину` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            if (game[player].armor > game[playerEnemy].armor)
                game[player].armor = Math.floor(0.5 * game[player].armor);
            else
                game[playerEnemy].armor = Math.floor(0.5 * game[playerEnemy].armor);
        }
    },
    {
        id: 207,
        value: 4,
        cost: 14,
        canIncrease: true,
        name: "Водоворот",
        description() { return `Наносит врагу ${this.value} урона\nВраг получает -1 к магии воды` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            lossMagicLvl(game, "water", playerEnemy, 1);
            damage(game, playerEnemy, value);
        }
    },
    {
        id: 208,
        cost: 5,
        value: 5,
        name: `Полезный гейзер`,
        description() { return `Оба игрока получают по ${this.value} очк. к каждой магии, Ваша обувь получает +${this.value}% к эффектам воды` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            game[player].magics.chaos.hits += value
            game[player].magics.earth.hits += value
            game[player].magics.dark.hits += value
            game[playerEnemy].magics.chaos.hits += value
            game[playerEnemy].magics.earth.hits += value
            game[playerEnemy].magics.water.hits += value
            game[playerEnemy].magics.dark.hits += value
            modifyItem(game, player, "boots", "waterEffectsPlus", value);
        }
    },
    {
        id: 209,
        value: 10,
        cost: 15,
        canIncrease: true,
        name: "Целитель",
        description() { return `Вы получаете +${this.value} к здоровью` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            game[player].health += value;
        }
    },
    {
        id: 210,
        value: 10,
        cost: 10,
        canIncrease: true,
        playAgain: true,
        name: "Глинтвейн",
        description() { return `Вы получаете +${valuePercent(50, this.value)} к здоровью и +${valuePercent(50, this.value)} к очк. магии тьмы` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            game[player].health += value;
            game[player].magics.water.hits += value;
        }
    },
    {
        id: 211,
        cost: 5,
        name: "Сообщающие сосуды",
        description() { return `Очки магии воды у игроков выравниваются` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            const waterHits = Math.floor(0.5 * (game[player].magics.water.hits + game[playerEnemy].magics.water.hits));
            game[player].magics.water.hits = waterHits;
            game[playerEnemy].magics.water.hits = waterHits;
        }
    },
    {
        id: 212,
        value: 20,
        cost: 15,
        canIncrease: true,
        name: "Наводнение",
        description() { return `Наносит врагу ${this.value} урона и его шлем получает +1 к магии хаоса` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, value);
            modifyItem(game, playerEnemy, "head", "chaosLvlPlus", 1);
        }
    },
    {
        id: 213,
        value: 3,
        cost: 3,
        canIncrease: true,
        playAgain: true,
        name: "Сосулька",
        description() { return `Наносит врагу ${this.value} урона` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, value);
        }
    },
    {
        id: 214,
        value: 15,
        cost: 23,
        canIncrease: true,
        name: "Горячие источники",
        description() { return `Вы получаете +${this.value} к здоровью` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            game[player].health += value;
        }
    },
    {
        id: 215,
        value: 10,
        cost: 10,
        canIncrease: true,
        name: "Грязевые ванны",
        description() { return `Вы получаете +${valuePercent(50, this.value)} к здоровью. Ваш броник получает +${valuePercent(50, this.value)}% к эффектам земли` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            game[player].health += valuePercent(50, this.value);
            modifyItem(game, player, "body", "earthEffectsPlus", valuePercent(50, value));
        }
    },
    {
        id: 216,
        value: 10,
        cost: 20,
        canIncrease: true,
        name: "Шторм",
        description() { return `Враг получает ${this.value} урона и -1 к магии земли` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, value);
            lossMagicLvl(game, "earth", playerEnemy, 1);
        }
    },
    {
        id: 217,
        value: 7,
        cost: 5,
        canIncrease: true,
        name: "Пробитая канализация",
        description() { return `Враг получает ${this.value} урона и его обувь получает +1 к магии тьмы` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, value);
            modifyItem(game, playerEnemy, "boots", "darkLvlPlus", 1);
        }
    },
    {
        id: 218,
        cost: 20,
        name: "Святая вода",
        description() { return `Враг теряет 2 уровня магии тьмы` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            lossMagicLvl(game, "dark", playerEnemy, 2);
        }
    },
    {
        id: 219,
        value: 5,
        cost: 5,
        canIncrease: true,
        name: "Гололед",
        description() { return `Наносит врагу ${this.value} урона` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, value);
        }
    },
    {
        id: 220,
        value: 10,
        cost: 20,
        canIncrease: true,
        name: "Нападение акулы",
        description() { return `Наносит врагу ${this.value} урона\n Враг теряет голову!` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, value);
            game[playerEnemy].head = {
                name: "Всё что осталось",
                description: "Ладно хоть башку не сожрали!",
                id: `${this.id}.2`,
                magic: this.magic,
            }

        }
    },
    // {
    //     id: 2,
    //     value: 0,
    //     cost: 0,
    //     canIncrease: true,
    //     playAgain: true,
    //     name: "",
    //     description() { return `` },
    //     magic: "water",
    //     play(game, player, playerEnemy, value) {

    //         
    //     }
    // },
    {
        id: 301,
        cost: 10,
        name: "Дивный сад",
        description() { return `+1 к магии земли` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            game[player].magics.earth.lvl += 1;
        }
    },
    {
        id: 302,
        cost: 10,
        name: "Удобрение",
        description() { return `+1 к магии земли` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            game[player].magics.earth.lvl += 1;
        }
    },
    {
        id: 303,
        value: 8,
        cost: 8,
        canIncrease: true,
        name: "Защита древних",
        description() { return `+${this.value} к щиту` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            game[player].armor += value;
        }
    },
    {
        id: 304,
        value: 10,
        cost: 10,
        canIncrease: true,
        name: "Каменная стена",
        description() { return `+${this.value} к щиту` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            game[player].armor += value;
        }
    },
    {
        id: 305,
        value: 20,
        cost: 20,
        canIncrease: true,
        name: "Крепость",
        description() { return `+${this.value} к щиту` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            game[player].armor += value;
        }
    },
    {
        id: 306,
        value: 40,
        cost: 10,
        canIncrease: true,
        name: "Землетрясение",
        description() { return `наносит ${valuePercent(50, this.value)} урона всем игрокам` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, valuePercent(50, this.value));
            damage(game, player, valuePercent(50, this.value));
        }
    },
    {
        id: 307,
        value: 3,
        cost: 3,
        name: "Зарытый клад",
        description() { return `+3 к очкам всех магий` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            game[player].magics.chaos.hits += value;
            game[player].magics.earth.hits += value;
            game[player].magics.water.hits += value;
            game[player].magics.dark.hits += value;
        }
    },
    {
        id: 308,
        cost: 15,
        name: "Силовой взрыв",
        description() { return `Наносит урон равный вашему щиту, вы теряете половину щита` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, game[player].armor);
            game[player].armor = Math.floor(0.5 * game[player].armor)

        }
    },
    {
        id: 309,
        cost: 15,
        name: "Непроходимое болото",
        description() { return `Враг теряет обувку` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            game[playerEnemy].boots = {
                name: "Ноги в глине",
                description: "А сапоги уплыли!",
                id: `${this.id}.2`,
                magic: this.magic,
            }

        }
    },
    {
        id: 310,
        cost: 0,
        name: "Оранжерея редких цветов",
        description() { return `+1 к магии земли\nвы теряете по 4 очка кажой магии` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            const lossValue = 4;
            game[player].magics.earth.lvl++;
            lossMagicHits(game, "chaos", player, lossValue);
            lossMagicHits(game, "earth", player, lossValue);
            lossMagicHits(game, "water", player, lossValue);
            lossMagicHits(game, "dark", player, lossValue);
        }
    },
    {
        id: 311,
        cost: 5,
        name: "Бобровая плотина",
        description() { return `+1 к магии земли\nвы теряете 10 очков магии воды` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            const lossValue = 10;
            game[player].magics.earth.lvl++;
            lossMagicHits(game, "water", player, lossValue);
        }
    },
    {
        id: 312,
        cost: 8,
        name: "Птичья атака",
        description() { return `Шлем противника получает -1 к магии земли` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            modifyItem(game, playerEnemy, "head", "earthLvlPlus", -1)

        }
    },
    {
        id: 313,
        cost: 5,
        value: 5,
        name: "Кирпич в ранце",
        canIncrease: true,
        description() { return `+${this.value} к щиту` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            game[player].armor += value;
        }
    },
    {
        id: 314,
        cost: 3,
        value: 3,
        name: "Коровий оберег",
        canIncrease: true,
        playAgain: true,
        description() { return `+${this.value} к щиту` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            game[player].armor += value;
        }
    },
    {
        id: 315,
        cost: 0,
        name: "Урожайный год",
        description() { return `Оба игрока получают +1 к магии земли` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            game[player].magics.earth.lvl++;
            game[playerEnemy].magics.earth.lvl++;
        }
    },
    {
        id: 316,
        cost: 5,
        value: 10,
        name: "Фундамент",
        canIncrease: true,
        description() { return `Если ваш щит = 0, то +${this.value} к щиту, иначе +${valuePercent(30, this.value)} к щиту` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            if (game[player].armor == 0)
                game[player].armor += value;
            else
                game[player].armor += valuePercent(30, value);
        }
    },
    {
        id: 317,
        cost: 10,
        value: 10,
        canIncrease: true,
        name: "Лишние кирпичи",
        description() { return `Если ваш щит > вражеского то наносит ${this.value} урона врагу, иначе + ${this.value} к вашему щиту` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            if (game[player].armor > game[playerEnemy].armor)
                damage(game, playerEnemy, value);
            else
                game[player].armor += value;
        }
    },
    {
        id: 318,
        cost: 10,
        name: "Перекачка энергии",
        description() { return `Восстанавливаете здоровье в размере от половины вашего щита, вы теряете  половину щита` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            game[player].health += Math.floor(game[player].armor / 2);
            game[player].armor = Math.floor(0.5 * game[player].armor);
        }
    },
    {
        id: 401,
        value: 1,
        cost: 1,
        canIncrease: true,
        name: "Перегоревший выключатель",
        playAgain: true,
        description() { return `нанести врагу ${this.value} урона` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, value);
        }
    },
    {
        id: 402,
        value: 4,
        cost: 5,
        canIncrease: true,
        name: "Кровавый червь",
        description() { return `похищает ${valuePercent(50, this.value)} здоровья врага` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, valuePercent(50, value));
            game[player].health += valuePercent(50, value);
        }
    },
    {
        id: 403,
        value: 9,
        cost: 9,
        canIncrease: true,
        name: "Темный путник",
        description() { return `похищает по ${valuePercent(33, this.value)} очк. остальных магий` },
        magic: "dark",
        playAgain: true,
        play(game, player, playerEnemy, value) {
            value = valuePercent(33, value);
            game[player].magics.chaos.hits += lossMagicHits(game, "chaos", playerEnemy, value);
            game[player].magics.earth.hits += lossMagicHits(game, "earth", playerEnemy, value);
            game[player].magics.water.hits += lossMagicHits(game, "water", playerEnemy, value);
        }
    },
    {
        id: 404,
        value: 6,
        cost: 7,
        canIncrease: true,
        name: "Летучая мышь",
        description() { return `похищает ${valuePercent(50, this.value)} здоровья врага` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, valuePercent(50, value));
            game[player].health += valuePercent(50, value);
        }
    },
    {
        id: 405,
        value: 8,
        cost: 10,
        canIncrease: true,
        name: "Переливание",
        description() { return `похищает ${valuePercent(50, this.value)} здоровья врага` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, valuePercent(50, value));
            game[player].health += valuePercent(50, value);
        }
    },
    {
        id: 406,
        value: 16,
        cost: 20,
        canIncrease: true,
        name: "Граф отодракула",
        description() { return `похищает ${valuePercent(50, this.value)} здоровья врага` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, valuePercent(50, value));
            game[player].health += valuePercent(50, value);
        }
    },
    {
        id: 407,
        value: 8,
        cost: 10,
        canIncrease: true,
        name: "Высасывание жизни",
        description() { return `похищает ${valuePercent(50, this.value)} здоровья врага` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            damage(game, playerEnemy, valuePercent(50, value));
            game[player].health += valuePercent(50, value);
        }
    },
    {
        id: 408,
        value: 10,
        cost: 5,
        canIncrease: true,
        name: "Старая подруга",
        description() { return `Вы теряете ${this.value} здоровья и наносите  ${valuePercent(200, this.value)} урона врагу` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            game[player].health -= 10;
            damage(game, playerEnemy, valuePercent(200, value));
        }
    },
    {
        id: 409,
        value: 10,
        cost: 5,
        canIncrease: true,
        name: "Темный оберег",
        description() { return `Вы теряете ${this.value} здоровьи и получаете  +${valuePercent(200, this.value)} к щиту` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            game[player].health -= value;
            game[player].armor += valuePercent(200, value);
        }
    },
    {
        id: 410,
        cost: 15,
        name: "Смена полярности",
        description() { return `каждый игрок теряет половину своего щита` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            game[playerEnemy].armor = (Math.floor(0.5 * game[playerEnemy].armor));
            game[player].armor = (Math.floor(0.5 * game[player].armor));
        }
    },
    {
        id: 411,
        cost: 10,
        name: "Кошмар",
        description() { return `Враг сбрасывает все карты с руки, кроме одной ` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            game[playerEnemy].handCardsId = game[playerEnemy].handCardsId.slice(0, 1);
        }
    },
    {
        id: 412,
        value: 12,
        cost: 6,
        canIncrease: true,
        name: "Темный переулок",
        description() { return `враг теряет по ${valuePercent(25, this.value)} очк. каждой магии` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            lossMagicHits(game, "chaos", playerEnemy, valuePercent(25, value));
            lossMagicHits(game, "water", playerEnemy, valuePercent(25, value));
            lossMagicHits(game, "earth", playerEnemy, valuePercent(25, value));
            lossMagicHits(game, "dark", playerEnemy, valuePercent(25, value));
        }
    },
    {
        id: 413,
        value: 10,
        cost: 10,
        name: "Темный ритуал",
        description() { return `Оба игрока теряют ${this.value} здоровья, вы получаете +1 к магии тьмы ` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            game[player].health -= value;
            game[playerEnemy].health -= value;
            game[player].magics.dark.lvl++;
        }
    },
    {
        id: 414,
        cost: 10,
        name: "Черная материя",
        description() { return `Вы получаете +1 к магии тьмы` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            game[player].magics.dark.lvl++;
        }
    },
    {
        id: 415,
        cost: 0,
        name: "Запретная магия",
        playAgain: true,
        description() { return `Вы теряете щит и получаете +1 к магии тьмы` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            game[player].armor = 0;
            game[player].magics.dark.lvl++;
        }
    },
    {
        id: 416,
        cost: 0,
        name: "Черная дыра",
        playAgain: true,
        description() { return `Вы теряете все очки магии хаоса, земли, воды и получаете +2 к магии тьмы` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            game[player].magics.chaos.hits = 0;
            game[player].magics.water.hits = 0;
            game[player].magics.earth.hits = 0;
            game[player].magics.dark.lvl += 2;
        }
    },
    {
        id: 417,
        value: 5,
        cost: 5,
        canIncrease: true,
        name: "Бездна",
        description() { return `Оба игрока теряют по ${this.value} очков каждой магии\nВы получаете +${this.value} к щиту` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            lossMagicHits(game, "chaos", player, value);
            lossMagicHits(game, "earth", player, value);
            lossMagicHits(game, "water", player, value);
            lossMagicHits(game, "chaos", playerEnemy, value);
            lossMagicHits(game, "earth", playerEnemy, value);
            lossMagicHits(game, "water", playerEnemy, value);
            lossMagicHits(game, "dark", playerEnemy, value);
            game[player].armor += value;
        }
    },
    {
        id: 418,
        value: 10,
        cost: 10,
        canIncrease: true,
        name: "Жертво-\nприношение",
        description() { return `Вы теряете по ${this.value} очков каждой магии и восстанавливаете себе ${this.value} здоровья` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            lossMagicHits(game, "chaos", player, value);
            lossMagicHits(game, "earth", player, value);
            lossMagicHits(game, "water", player, value);
            game[player].health += value;
        }
    },
    {
        id: 501,
        cost: 10,
        name: "Специалист магии хаоса",
        description() { return `Вы становитесь специалистом магии хаоса` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            if (game[player].magicSpeciality != "chaos") {
                game[player].magicSpeciality = "chaos";
                game[player].magicSpecialityLvl = 1;
            }

        }
    },
    {
        id: 502,
        cost: 10,
        name: "Специалист магии воды",
        description() { return `Вы становитесь специалистом магии воды` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            if (game[player].magicSpeciality != "water") {
                game[player].magicSpeciality = "water";
                game[player].magicSpecialityLvl = 1;
            }

        }
    },
    {
        id: 503,
        cost: 10,
        name: "Специалист магии земли",
        description() { return `Вы становитесь специалистом магии земли` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            if (game[player].magicSpeciality != "earth") {
                game[player].magicSpeciality = "earth";
                game[player].magicSpecialityLvl = 1;
            }

        }
    },
    {
        id: 504,
        cost: 10,
        name: "Специалист магии тьмы",
        description() { return `Вы становитесь специалистом магии тьмы` },
        magic: "dark",
        play(game, player, playerEnemy, value) {
            if (game[player].magicSpeciality != "dark") {
                game[player].magicSpeciality = "dark";
                game[player].magicSpecialityLvl = 1;
            }

        }
    },
    {
        id: 505,
        cost: 10,
        name: "Университет",
        description() { return `+1 к специальности\nВы теряете по 10 очков каждой магии` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            if (game[player].magicSpeciality != "none")
                game[player].magicSpecialityLvl++;
            lossMagicHits(game, "water", player, 10)
            lossMagicHits(game, "earth", player, 10)
            lossMagicHits(game, "dark", player, 10)

        }
    },
    {
        id: 506,
        cost: 10,
        name: "Библиотека",
        description() { return `+1 к специальности\nВы теряете по 10 очков каждой магии` },
        magic: "chaos",
        play(game, player, playerEnemy, value) {
            if (game[player].magicSpeciality != "none")
                game[player].magicSpecialityLvl++;
            lossMagicHits(game, "water", player, 10)
            lossMagicHits(game, "earth", player, 10)
            lossMagicHits(game, "dark", player, 10)

        }
    },
    {
        id: 507,
        cost: 10,
        name: "Созерцание",
        description() { return `+1 к специальности\nВы теряете по 10 очков каждой магии` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            if (game[player].magicSpeciality != "none")
                game[player].magicSpecialityLvl++;
            lossMagicHits(game, "chaos", player, 10)
            lossMagicHits(game, "earth", player, 10)
            lossMagicHits(game, "dark", player, 10)

        }
    },
    {
        id: 508,
        cost: 10,
        name: "Редкая книга",
        description() { return `+1 к специальности\nВы теряете по 10 очков каждой магии` },
        magic: "water",
        play(game, player, playerEnemy, value) {
            if (game[player].magicSpeciality != "none")
                game[player].magicSpecialityLvl++;
            lossMagicHits(game, "chaos", player, 10)
            lossMagicHits(game, "earth", player, 10)
            lossMagicHits(game, "dark", player, 10)

        }
    },
    {
        id: 509,
        cost: 10,
        name: "Древо мудрости",
        description() { return `+1 к специальности\nВы теряете по 10 очков каждой магии` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            if (game[player].magicSpeciality != "none")
                game[player].magicSpecialityLvl++;
            lossMagicHits(game, "chaos", player, 10)
            lossMagicHits(game, "water", player, 10)
            lossMagicHits(game, "dark", player, 10)

        }
    },
    {
        id: 510,
        cost: 10,
        name: "Реликвия",
        description() { return `+1 к специальности\nтеряете по 10 очков каждой магии` },
        magic: "earth",
        play(game, player, playerEnemy, value) {
            if (game[player].magicSpeciality != "none")
                game[player].magicSpecialityLvl++;
            lossMagicHits(game, "chaos", player, 10)
            lossMagicHits(game, "water", player, 10)
            lossMagicHits(game, "dark", player, 10)

        }
    },
    {
        id: 1001,
        cost: 5,
        name: "Шляпа ученика магии хаоса",
        description() { return `+1 к магии хаоса` },
        magic: "chaos",
        item: "head",
        playAgain: true,
        chaosLvlPlus: 1,
        play: setItem,
    },
    {
        id: 1002,
        cost: 7,
        name: "Горящая кепка",
        description() { return `+7% к эффектам хаоса` },
        magic: "chaos",
        item: "head",
        playAgain: true,
        chaosEffectsPlus: 7,
        play: setItem,
    },
    {
        id: 1003,
        cost: 15,
        name: "Огненный меч",
        description() { return `+15% к эффектам хаоса` },
        magic: "chaos",
        item: "weapon",
        chaosEffectsPlus: 15,
        playAgain: true,
        play: setItem,
    },
    {
        id: 1004,
        cost: 5,
        name: "Зажигалка",
        description() { return `+5% к эффектам хаоса` },
        magic: "chaos",
        item: "weapon",
        chaosEffectsPlus: 5,
        playAgain: true,
        play: setItem,
    },
    {
        id: 1005,
        cost: 15,
        name: "Ботинки из лавы",
        description() { return `+10% к эффектам хаоса\n +1 магии хаоса` },
        magic: "chaos",
        item: "boots",
        chaosEffectsPlus: 10,
        chaosLvlPlus: 1,
        playAgain: true,
        play: setItem,
    },
    {
        id: 1006,
        cost: 10,
        name: "Зачарованные ботинки",
        description() { return `+2 к магии хаоса` },
        magic: "chaos",
        item: "boots",
        chaosLvlPlus: 2,
        playAgain: true,
        play: setItem,
    },
    {
        id: 1007,
        cost: 10,
        name: "Распродажа 1+1",
        description() { return `Одевают оба игрока\n +1 к случайной магии` },
        magic: "chaos",
        item: "body",
        play(game, player, playerEnemy, value) {
            let magicForPlayer1 = randomInteger(1, 4);
            let magicForPlayer2 = randomInteger(1, 4);
            switch (magicForPlayer1) {
                case 1: magicForPlayer1 = "chaosLvlPlus"; break;
                case 2: magicForPlayer1 = "earthLvlPlus"; break;
                case 3: magicForPlayer1 = "waterLvlPlus"; break;
                case 4: magicForPlayer1 = "darkLvlPlus"; break;
            }
            switch (magicForPlayer2) {
                case 1: magicForPlayer2 = "chaosLvlPlus"; break;
                case 2: magicForPlayer2 = "earthLvlPlus"; break;
                case 3: magicForPlayer2 = "waterLvlPlus"; break;
                case 4: magicForPlayer2 = "darkLvlPlus"; break;
            }
            game[player].body = {
                id: `${this.id}.1`,
                name: "Классная футболка!",
                item: this.item,
                // description: `+1 к магии ${magicForPlayer1.magicRus}`,
                [magicForPlayer1]: 1,
            };
            game[playerEnemy].body = {
                id: `${this.id}.2`,
                name: "Классная футболка!",
                item: this.item,
                // description: `+1 к магии ${magicForPlayer2.magicRus}`,
                [magicForPlayer2]: 1,
            }

        }
    },
    {
        id: 1008,
        cost: 30,
        name: "Шлем бога огня",
        description() { return `+30% к эффектам хаоса` },
        magic: "chaos",
        item: "head",
        chaosEffectsPlus: 30,
        playAgain: true,
        play: setItem,
    },
    {
        id: 1009,
        cost: 10,
        name: "Обжигающая броня",
        description() { return `наносит 1 урона врагу каждый ход` },
        magic: "chaos",
        item: "body",
        stepPlayerEnemyDamage: 1,
        playAgain: true,
        play: setItem,
    },
    {
        id: 2001,
        cost: 5,
        name: "Пускатель пузыриков",
        description() { return `+5% к эффектам магии воды` },
        magic: "water",
        item: "weapon",
        waterEffectsPlus: 5,
        playAgain: true,
        play: setItem,
    },
    {
        id: 2002,
        cost: 5,
        name: "Резиновые сапоги",
        description() { return `+1 к магии воды` },
        magic: "water",
        item: "boots",
        waterLvlPlus: 1,
        playAgain: true,
        play: setItem,
    },
    {
        id: 2003,
        cost: 10,
        name: "Пивная шапка",
        description() { return `+2 к магии воды` },
        magic: "water",
        item: "head",
        waterLvlPlus: 2,
        playAgain: true,
        play: setItem,
    },
    {
        id: 2004,
        cost: 10,
        name: "Купальник",
        description() { return `+1 к магии воды и +5% эффектам магии воды` },
        magic: "water",
        item: "body",
        waterLvlPlus: 1,
        waterEffectsPlus: 5,
        playAgain: true,
        play: setItem,
    },
    {
        id: 2005,
        cost: 15,
        name: "Ледяной меч",
        description() { return `+2 к магии воды и +5% к эффектам магии воды` },
        magic: "water",
        item: "weapon",
        waterEffectsPlus: 5,
        waterLvlPlus: 2,
        playAgain: true,
        play: setItem,
    },
    {
        id: 2006,
        cost: 18,
        name: "Доска для серфа",
        description() { return `+10% к эффектам магии воды и +1 к количеству карт в руке` },
        magic: "water",
        item: "boots",
        countHandCardPlus: 1,
        waterEffectsPlus: 10,
        playAgain: true,
        play: setItem,
    },
    {
        id: 2007,
        cost: 20,
        name: "Ледяной доспех",
        description() { return `+15% к эффектам магии воды\n +1 к магии воды` },
        magic: "water",
        item: "body",
        waterEffectsPlus: 15,
        waterLvlPlus: 1,
        playAgain: true,
        play: setItem,
    },
    {
        id: 2008,
        cost: 20,
        name: "Шлем прилива",
        description() { return `+2 к магии воды, + 10% к эффектам магии воды` },
        magic: "water",
        item: "head",
        waterEffectsPlus: 10,
        waterLvlPlus: 2,
        playAgain: true,
        play: setItem,
    },
    {
        id: 2009,
        cost: 35,
        name: "Трезубец",
        description() { return `+3 к магии воды, +20% к эффектам магии воды` },
        magic: "water",
        item: "weapon",
        playAgain: true,
        waterEffectsPlus: 20,
        waterLvlPlus: 3,
        play: setItem,
    },
    // {
    //     id: 2,
    //     cost: 0,
    //     name: "",
    //     description() { return `` },
    //     magic: "earth",
    //     item: "",
    //     playAgain: true,
    //     play: setItem,
    // },
    {
        id: 3001,
        cost: 16,
        name: "Сапоги скороходы",
        description() { return `+2 к количеству карт в руке` },
        magic: "earth",
        item: "boots",
        countHandCardPlus: 2,
        playAgain: false,
        play: setItem,
    },
    {
        id: 3002,
        cost: 5,
        name: "Палка местного дурачка",
        description() { return `+1 к магии земли` },
        magic: "earth",
        item: "weapon",
        earthLvlPlus: 1,
        playAgain: true,
        play: setItem,
    },
    {
        id: 3003,
        cost: 10,
        name: "Веточка сакуры",
        description() { return `+1 к магии земли\n +5% к эффектам земли` },
        magic: "earth",
        item: "weapon",
        earthLvlPlus: 1,
        earthEffectsPlus: 5,
        playAgain: true,
        play: setItem,
    },
    {
        id: 3004,
        cost: 25,
        name: "Посох чародея",
        description() { return `+25% к эффектам земли` },
        magic: "earth",
        item: "weapon",
        earthEffectsPlus: 25,
        playAgain: true,
        play: setItem,
    },
    {
        id: 3005,
        cost: 10,
        name: "Шлем из глины",
        description() { return `+1 к магии земли\n +5% к эффектам земли` },
        magic: "earth",
        item: "head",
        earthLvlPlus: 1,
        earthEffectsPlus: 5,
        playAgain: true,
        play: setItem,
    },
    {
        id: 3006,
        cost: 13,
        name: "Скворечник",
        description() { return `+1 к магии земли\n +1 к количеству карт в руке` },
        magic: "earth",
        item: "head",
        earthLvlPlus: 1,
        countHandCardPlus: 1,
        playAgain: true,
        play: setItem,
    },
    {
        id: 3007,
        cost: 10,
        name: "Защитка",
        description() { return `+1 к щиту каждый ход` },
        magic: "earth",
        item: "body",
        stepPlayerArmorChange: 1,
        playAgain: true,
        play: setItem,
    },
    {
        id: 3008,
        cost: 10,
        name: "Бабушкин свитер",
        description() { return `+2 к магии земли` },
        magic: "earth",
        item: "body",
        earthLvlPlus: 2,
        playAgain: true,
        play: setItem,
    },
    {
        id: 3009,
        cost: 15,
        name: "Туфли Элрока",
        description() { return `+1 к магии земли, \n+10% r эффектам земли` },
        magic: "earth",
        item: "boots",
        earthLvlPlus: 1,
        earthEffectsPlus: 10,
        playAgain: true,
        play: setItem,
    },
    {
        id: 4001,
        cost: 10,
        name: "Черный кофе",
        description() { return `+5% к эффектам\n и  +1 к магии тьмы` },
        magic: "dark",
        item: "weapon",
        darkEffectsPlus: 5,
        darkLvlPlus: 1,
        playAgain: true,
        play: setItem,
    },
    {
        id: 4002,
        cost: 20,
        name: "Посох мертвеца",
        description() { return `+15% к эффектам\n и  +1 к магии тьмы` },
        magic: "dark",
        item: "weapon",
        darkEffectsPlus: 15,
        darkLvlPlus: 1,
        playAgain: true,
        play: setItem,
    },
    {
        id: 4003,
        cost: 10,
        name: "Мантия",
        description() { return `+10% к эффектам магии тьмы` },
        magic: "dark",
        item: "body",
        darkEffectsPlus: 10,
        playAgain: true,
        play: setItem,
    },
    {
        id: 4004,
        cost: 10,
        name: "Темное одеяние",
        description() { return `+2 к магии тьмы` },
        magic: "dark",
        item: "body",
        darkLvlPlus: 2,
        playAgain: true,
        play: setItem,
    },
    {
        id: 4005,
        cost: 13,
        name: "Обвувь падшего ангела",
        description() { return `+1 к магии тьмы\n +1 к количеству карт в руке` },
        magic: "dark",
        item: "boots",
        darkLvlPlus: 1,
        countHandCardPlus: 1,
        playAgain: true,
        play: setItem,
    },
    {
        id: 4006,
        cost: 30,
        name: "Сапоги анархиста",
        description() { return `+30% к эффектам магии тьмы` },
        magic: "dark",
        item: "boots",
        darkEffectsPlus: 30,
        playAgain: true,
        play: setItem,
    },
    {
        id: 4007,
        cost: 25,
        name: "Шляпа темного лорда",
        description() { return `+15% к эффектам\n и  +2 к магии тьмы` },
        magic: "dark",
        item: "head",
        darkEffectsPlus: 15,
        darkLvlPlus: 2,
        playAgain: true,
        play: setItem,
    },
    {
        id: 4008,
        cost: 10,
        name: "Шляпа фокусника",
        description() { return `+10% к эффектам магии тьмы` },
        magic: "dark",
        item: "head",
        darkEffectsPlus: 10,
        playAgain: true,
        play: setItem,
    },
    {
        id: 4009,
        cost: 20,
        name: "Клинок белого ходока",
        description() { return `+2 к магии тьмы, +10% к эффектам тьмы` },
        magic: "dark",
        item: "weapon",
        darkLvlPlus: 2,
        darkEffectsPlus: 10,
        playAgain: true,
        play: setItem,
    },
];

function valuePercent(percent, value) {
    return (Math.ceil((percent / 100) * value));
}



function setItem(game, player) {
    game[player][this.item] = { ... this };
    delete game[player][this.item].play;
    return (!this.playAgain);
};

function modifyItem(game, player, item, property, value) {
    if (game[player][item].item) {
        if (game[player][item][property] == undefined) {
            game[player][item][property] = value;
        }
        else {
            game[player][item][property] += value;
        }
    }
};


function damage(game, player, value) {
    if (game[player].armor <= value) {
        game[player].health -= value - game[player].armor;
        game[player].armor = 0;
    } else {
        game[player].armor -= value;
    }
};

function lossMagicHits(game, magic, player, value) {
    let result = 0;
    if (game[player].magics[magic].hits <= value) {
        result = value - game[player].magics[magic].hits;
        game[player].magics[magic].hits -= result;
        game[player].magics[magic].hits = 0;
    } else {
        game[player].magics[magic].hits -= value;
        result = value;
    }
    return (result);
};

function lossMagicLvl(game, magic, player, value) {
    game[player].magics[magic].lvl -= value;
    if (game[player].magics[magic].lvl < 1) { // меньше 1 не опускаемся! вместо этого уменьшим шмотку, которая дает бонус
        game[player].magics[magic].lvl = 1;
        ["head", "weapon", "body", "boots"].find(item => {
            if (game[player][item][`${magic}LvlPlus`])
                if (game[player][item][`${magic}LvlPlus`] > 0) {
                    if (game[player][item][`${magic}LvlPlus`] >= value) {
                        game[player][item][`${magic}LvlPlus`] -= value;

                    } else {
                        value -= game[player][item][`${magic}LvlPlus`];
                        game[player][item][`${magic}LvlPlus`] = 0;
                    }
                }
        })
    }
};

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


module.exports.deck = deck.map(value => ["inDeck", value]);