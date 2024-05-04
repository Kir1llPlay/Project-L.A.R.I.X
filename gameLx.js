var EnemyArrLength = 2;
var EnemyArr = [];
var TimmateArr = [];
var GlobalArr = [];


//чисто экспериментальная функция, еë внешний вид изменится к выходу нормального PvE и PvP.
function createEnemyArr() {
    for (i = 0; i < EnemyArrLength; i++) {
        EnemyArr[i] = new BatTemplate;
    }
}

function createChoosenArray() {
    for (i = 0; i < 3; i++) {
        if (ChoosenHeroes[i].firstChild !== null) {
            let num = ChoosenHeroes[i].firstChild.classList[0];
            choosenArr.push(Player.OpenedHeroes[Number(num)]);
        }
    }
}

var battleWindow = document.getElementById('BattleWindow');
var Move = document.querySelector('.moveTab');
function StartBattle() {
    createChoosenArray();
    if (choosenArr.length === 0) {
        return;
    }
    TimmateArr = Object.assign([], choosenArr);
    document.querySelector('.BattleMenu').style.display = "none";
    battleWindow.style.display = 'grid';
    Move.style.display = 'flex';
    document.getElementById('BattleWindow').style.backgroundImage = document.getElementById('table').style.backgroundImage;
    createEnemyArr();
    SortGlobalArr();
    DownloadAll();
}

function CheckHP(face) {
    if (GlobalArr.length === 0) return;
    if (face.HP <= 0) {
        Del(face);
        return;
    }
    if (face.HP > face.maxHP) {
        face.HP = face.maxHP;
    }
    if (face.MP > face.maxMP) {
        face.MP = face.maxMP;
    }
    if (face.MP < 0) {
        face.MP = 0;
    }
    ShowHP(face, true);
}

function ShowHP(face, bool) {
    face.characterHPcount.innerHTML = face.HP + '/' + face.maxHP;
    face.characterHP.style.width = face.HP / face.maxHP * 100 + 'px';
    if (face.maxMP > 0) {
        face.characterMPcount.innerHTML = face.MP + '/' + face.maxMP;
        face.characterMP.style.width = face.MP / face.maxMP * 100 + 'px';
    }
    if (!bool) return;
    BattleCycle();
}

var TimmateField = document.getElementById('timmateField');
var EnemyField = document.getElementById('enemyField');

function FieldChoose(num) {
    if (GlobalArr[num].attack === "Timmate") {
        return TimmateField;
    } else {
        return EnemyField;
    }
}

function DownloadAll() {
    for (i = 0; i < GlobalArr.length; i++) {
        CreateHTML(GlobalArr[i]);
        DownloadToBattle(FieldChoose(i), GlobalArr[i]);
    }
    BattleCycle();
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
    face.characterAvatar.setAttribute('src', face.Avatar);
    if (face.attack === "Enemy") {
        face.characterDiv.classList.add('ENEMY');
    } else {
        face.characterDiv.classList.add('TIMMATE');
    }
    face.characterHPborder.append(face.characterHPcount, face.characterHP);
    face.characterDiv.append(face.characterAvatar, face.characterHPborder);
    if (face.maxMP > 0) {
        face.characterMPborder.classList.add('BarBorder');
        face.characterMP.classList.add('Bar');
        face.characterMPcount.classList.add('BarCount');
        face.characterMPborder.style.bottom = "-48px";
        face.characterMP.style.backgroundColor = "#14a1ff";
        face.characterMPborder.append(face.characterMPcount, face.characterMP);
        face.characterDiv.append(face.characterMPborder);
    }
    field.appendChild(face.characterDiv);
    ShowHP(face, false);
}

function LightAttacked(face) {
    face.characterDiv.classList.add('AttackedCharacter');
    setTimeout(function() {
        face.characterDiv.classList.remove('AttackedCharacter');
    }, 100);
}

function Del(face) {
    face.characterDiv.style.display = 'none';
    if (GlobalArr.indexOf(face) <= counter) {
        counter -= 1;
    }
    let spliced;
    if (face.attack === "Timmate") {
        spliced = TimmateArr.indexOf(face);
        TimmateArr.splice(spliced, 1);
    } else {
        itemsCheck(face.loot);
        spliced = EnemyArr.indexOf(face);
        EnemyArr.splice(spliced, 1);
    }
    StopBattle();
}

function StopBattle() {
    if (EnemyArr.length > 0 && TimmateArr.length > 0) {
        BattleCycle();
        return;
    }
    GlobalArr.length = 0;
    EnemyArr.length = 0;
    TimmateArr.length = 0;
    for (i = 0; i < choosenArr.length; i++) {
        choosenArr[i].HP = choosenArr[i].maxHP;
    }
    choosenArr.length = 0;
    moveCounter = 1;
    counter = -1;
    setTimeout(function() {
        alert("Бой окончен!");
        TimmateField.replaceChildren();
        EnemyField.replaceChildren();
        battleWindow.style.display = 'none';
        Move.style.display = 'none';
        document.getElementById('StartLocation').style.display = "block";
        Move.innerHTML = "Текущий ход: " + moveCounter;
    }, 400);
}

function SortGlobalArr() {
    if (TimmateArr.length === 0 || EnemyArr.length === 0) return GlobalArr.length = 0;
    GlobalArr = [...TimmateArr, ...EnemyArr].sort((a,b) => a.SPD > b.SPD ? -1 : 1);
}

var rand;
function RandomNumber(a, b) {
    rand = a - 0.5 + Math.random() * (b - a + 1);
    rand = Math.round(rand);
    return rand;
}

var triggered = false;
function Start(target, user, targetArr, timmateArr) {
    setTimeout(() => {
        for (i = 0; i < user.ChoosenSkills.length; i++) {
            for (j = 0; j < list.length; j++) {
                if (list[j][0] === user.ChoosenSkills[i]) {
                    if (RandomNumber(0, 100) <= list[j][1]) {
                        user.ChoosenSkills[i](target, user, targetArr, timmateArr);
                        triggered = true;
                    }
                }
            }
        }
        for (k = 0; k < user.WeaponSkills.length; k++) {
            for (y = 0; y < list.length; y++) {
                if (list[y][0] === user.WeaponSkills[k]) {
                    if (RandomNumber(0, 100) <= list[y][1]) {
                        user.WeaponSkills[k](target, user, targetArr, timmateArr);
                        triggered = true;
                    }
                }
            }
        }
        if (triggered === false) {
            StandartAttack(target, user, targetArr, timmateArr);
        }
        triggered = false;
    }, 100)
}

var moveCounter = 1;
Move.innerHTML = "Текущий ход: " + moveCounter;
var counter = -1;
function BattleCycle() {
    SortGlobalArr();
    if (GlobalArr.length === 0) {
        return;
    }
    counter++;
    if (counter === GlobalArr.length) {
        counter = -1;
        moveCounter += 1;
        Move.innerHTML = "Текущий ход: " + moveCounter;
        BattleCycle();
        return;
    }
    if (GlobalArr[counter].attack === "Timmate") {
        Start(EnemyArr[RandomNumber(0, EnemyArr.length - 1)], GlobalArr[counter], EnemyArr, TimmateArr);
    } else {
        Start(TimmateArr[RandomNumber(0, TimmateArr.length - 1)], GlobalArr[counter], TimmateArr, EnemyArr);
    }
}