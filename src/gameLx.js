class Battle {
    #locationData;
    #enemyList = {
        "0": null,
        "1": null,
        "2": null
    }
    #timmateList = {
        "0": null,
        "1": null,
        "2": null
    }
    #enemyArr = [];
    #timmateArr = [];
    #globalArr = [];
    #globalEffects = [];
    #moveCounter = 1;
    #moveTab = document.querySelector('.moveTab');
    #triggered = false;
    #c = 0;
    #stop = false;

    constructor(locationData) {
        this.#locationData = locationData;
        this.startAll();
    }

    createTimmateArray() {
        for (i = 0; i < 3; i++) {
            if (ChoosenHeroes[i].firstChild !== null) {
                let num = ChoosenHeroes[i].firstChild.classList[0];
                Player.getOpenedHeroes()[Number(num)];
                this.#timmateList[i] = Player.getOpenedHeroes()[Number(num)];
                this.#timmateArr.push(Player.getOpenedHeroes()[Number(num)]);
                this.#timmateArr[i].setHP(this.#timmateArr[i].getMaxHP());
                this.#timmateArr[i].setMP(this.#timmateArr[i].getMaxMP());
            }
        }
    }

    async createEnemyArray() {
        let countOfCreatedEnemies = 0;
        let randNum;
        for (i = 0; i < this.#locationData.enemy.length; i++) {
            randNum = RandomNumber(this.#locationData.enemy[i][1][0], this.#locationData.enemy[i][1][1]);
            if (randNum > 0) {
                for (j = 0; j < randNum; j++) {
                    if (countOfCreatedEnemies === 3) break;
                    const responce = await fetch(`Characters/${this.#locationData.enemy[i][0]}.json`);
                    const data = await responce.json();
                    let newHero = new EnemyBase(data.id, data.name, data.fraction, "enemy", data.maxHP, data.maxMP, data.ATK, data.SPD, data.DEF, data.DEX, data.ACC, data.avatar, data.inGamePic);
                    newHero.setSkills(data.skills);
                    newHero.setLoot(data.loot);
                    newHero.setGainedXP(data.gainedXP);
                    this.#enemyList[countOfCreatedEnemies] = newHero;
                    this.#enemyArr.push(newHero);
                    countOfCreatedEnemies++;
                }
            }
        }
    }

    async startAll() {
        this.#moveTab.innerHTML = "Текущий ход: " + this.#moveCounter;
        this.createTimmateArray();
        await this.createEnemyArray();
        this.#globalArr = [...this.#timmateArr,
            ...this.#enemyArr];
        this.sortGlobalArr();
        DownloadAll(this.#globalArr);
        this.battleCycle();
    }

    sortGlobalArr() {
        this.#globalArr.sort((a, b) => (a.getSPD() + a.getBuffs()["SPD"]) * a.getBuffsInPercents()["SPD"] > (b.getSPD() + b.getBuffs()["SPD"]) * b.getBuffsInPercents()["SPD"] ? -1: 1);
    }

    battleCycle() {
        if (this.#stop === true) return;
        if (this.#globalArr.length === 0) {
            if (this.#timmateArr.length > 0 && this.#enemyArr.length > 0) {
                this.#moveCounter += 1;
                this.#globalArr = [...this.#timmateArr,
                    ...this.#enemyArr];
                this.#moveTab.innerHTML = "Текущий ход: " + this.#moveCounter;
                this.battleCycle();
                return;
            }
            return;
        }
        this.sortGlobalArr();
        if (this.#globalArr[0].getTeam() === "timmate") {
            this.start(this.#globalArr[0], this.#enemyArr, this.#timmateArr);
        } else {
            this.start(this.#globalArr[0], this.#timmateArr, this.#enemyArr);
        }
        this.#globalArr.splice(0, 1);
    }

    start(user, targetArr, timmateArr) {
        setTimeout(() => {
            if (this.#stop === true) return;
            if (this.#c >= user.getSkills().length) {
                this.#c = 0;
                this.battleCycle()
                return;
            }
            if (RandomNumber(0, 100) <= user.getSkills()[this.#c][1]) {
                user.action(list[user.getSkills()[this.#c][0]][0], targetArr, timmateArr);
                this.#triggered = true;
            }
            if (this.#triggered === false) {
                StandartAttack(user, targetArr, timmateArr);
            }
            this.#c++;
            this.#triggered = false;
            this.start(user, targetArr, timmateArr);
        }, 450);
    }

    findDead() {
        this.#timmateArr.forEach((character) => {
            if (!character.getIsAlive()) {
                this.#timmateArr.splice(this.#timmateArr.indexOf(character), 1);
            }});
        this.#enemyArr.forEach((character) => {
            if (!character.getIsAlive()) {
                character.getLoot();
                getXP(character.getGainedXP());
                this.#enemyArr.splice(this.#enemyArr.indexOf(character), 1);
            }});
        if (this.#timmateArr.length === 0 || this.#enemyArr.length === 0) {
            this.#stop = true;
            this.stopBattle();
            return;
        }
        this.#globalArr = [...this.#timmateArr,
            ...this.#enemyArr];
        this.sortGlobalArr();
    }

    stopBattle() {
        if (this.#timmateArr.length > 0) {
            setTimeout(function() {
                openLootWindow("Победа!");
            }, 400);
        } else {
            setTimeout(function() {
                openLootWindow("Поражение!");
            }, 400);
        }
    }
}

var battleWindow = document.getElementById('BattleWindow');
var Move = document.querySelector('.moveTab');
var battle;
var exp = 0;
var inventoryLootWindow = [];
function StartBattle() {
    if (ChoosenHeroes[0].firstChild === null && ChoosenHeroes[1].firstChild === null && ChoosenHeroes[2].firstChild === null) return
    battle = new Battle(locationBattleData);
    document.querySelector('.BattleMenu').style.display = "none";
    battleWindow.style.display = 'grid';
    Move.style.display = 'flex';
    document.getElementById('BattleWindow').style.backgroundImage = document.getElementById('table').style.backgroundImage;
}

function ShowHP(face) {
    face.characterHPcount.innerHTML = face.getHP() + '/' + face.getMaxHP();
    face.characterHP.style.width = face.getHP() / face.getMaxHP() * 100 + 'px';
}

function ShowMP(face) {
    face.characterMPcount.innerHTML = face.getMP() + '/' + face.getMaxMP();
    face.characterMP.style.width = face.getMP() / face.getMaxMP() * 100 + 'px';
}

var TimmateField = document.getElementById('timmateField');
var EnemyField = document.getElementById('enemyField');

function FieldChoose(character) {
    if (character.getTeam() === "timmate") {
        return TimmateField;
    } else {
        return EnemyField;
    }
}

function DownloadAll(allCharacters) {
    for (i = 0; i < allCharacters.length; i++) {
        CreateHTML(allCharacters[i]);
        DownloadToBattle(FieldChoose(allCharacters[i]), allCharacters[i]);
    }
}

function CreateHTML(face) {
    face.characterDiv = document.createElement('div');
    face.characterAvatar = document.createElement('img');
    face.characterHPborder = document.createElement('div');
    face.characterHP = document.createElement('div');
    face.characterHPcount = document.createElement('p');
    if (face.maxMP === 0) return;
    face.characterMPborder = document.createElement('div');
    face.characterMP = document.createElement('div');
    face.characterMPcount = document.createElement('p');
}

function DownloadToBattle(field, face) {
    face.characterHPborder.classList.add('BarBorder');
    face.characterHP.classList.add('Bar');
    face.characterHPcount.classList.add('BarCount');
    face.characterAvatar.classList.add('battleImg');
    face.characterAvatar.setAttribute('src', face.getAvatar());
    if (face.attack === "Enemy") {
        face.characterDiv.classList.add('ENEMY');
    } else {
        face.characterDiv.classList.add('TIMMATE');
    }
    face.characterHPborder.append(face.characterHPcount, face.characterHP);
    face.characterDiv.append(face.characterAvatar, face.characterHPborder);
    if (face.getMaxMP() > 0) {
        face.characterMPborder.classList.add('BarBorder');
        face.characterMP.classList.add('Bar');
        face.characterMPcount.classList.add('BarCount');
        face.characterMPborder.style.bottom = "-48px";
        face.characterMP.style.backgroundColor = "#14a1ff";
        face.characterMPborder.append(face.characterMPcount, face.characterMP);
        face.characterDiv.append(face.characterMPborder);
        ShowMP(face);
    }
    field.appendChild(face.characterDiv);
    ShowHP(face);
}

function LightAttacked(character) {
    character.characterDiv.classList.add('AttackedCharacter');
    setTimeout(function() {
        character.characterDiv.classList.remove('AttackedCharacter');
    }, 150);
}

function openLootWindow(text) {
    document.querySelector('.lootWindow').style.display = "flex";
    document.querySelector('.blockAll').style.display = "block";
    document.querySelector('.battleExp').innerHTML = "Получено опыта: " + exp;
    document.querySelector('.lootWindow').addEventListener('click', closeLootWindow);
    document.querySelector('.battleResult').innerHTML = text;
    renderLoot();
}

function closeLootWindow() {
    document.querySelector('.lootWindow').style.display = "none";
    document.querySelector('.blockAll').style.display = "none";
    TimmateField.replaceChildren();
    EnemyField.replaceChildren();
    battleWindow.style.display = 'none';
    Move.style.display = 'none';
    document.getElementById('StartLocation').style.display = "block";
    document.querySelector('.forLoot').replaceChildren();
    inventoryLootWindow = [];
    exp = 0;
}

function inventoryForLootWindow(item, itemCount) {
    let isDistributed = false;
    for (i = 0; i <= inventoryLootWindow.length; i++) {
        if (inventoryLootWindow[i] !== undefined) {
            if (inventoryLootWindow[i][0].getID() === item.getID()) {
                inventoryLootWindow[i][1] += itemCount;
                isDistributed = true;
                break;
        }
    }
        }
    if (isDistributed === true) return;
    inventoryLootWindow.push([item, itemCount]);
}

function renderLoot() {
    for (i = 0; i < inventoryLootWindow.length; i++) {
        let invDiv = document.createElement('div');
        let invImg = document.createElement('img');
        let invCount = document.createElement('p');
        invDiv.classList.add('lootDiv');
        invDiv.append(invImg, invCount);
        invImg.style.width = "100%";
        invImg.style.height = "100%";
        invCount.style.position = "absolute";
        invDiv.style.position = "relative";
        invCount.style.left = "5%";
        invCount.style.top = "50%";
        invCount.style.fontSize = "12px";
        invImg.setAttribute('src', inventoryLootWindow[i][0].getAvatar());
        invCount.innerHTML = inventoryLootWindow[i][1];
        document.querySelector('.forLoot').appendChild(invDiv);
    }
}

var rand;
function RandomNumber(a, b) {
    rand = Math.round(a - 0.5 + Math.random() * (b - a + 1));
    return rand;
}