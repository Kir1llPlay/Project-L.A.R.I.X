var EnemyArrLength = 2;
var EnemyArr = [];
var TimmateArr = [];
//эти два массива и всë, что выше - должно будет получать данные с сервера(если PvP), в случае PvE TimmateArr всë так же приходит с сервера, а EnemyArr создаëтся в зависимости от того, с кем битва(наверное тоже с сервера приходить будет).
var GlobalArr = [];


//чисто экспериментальная функция, еë внешний вид изменится к выходу нормального PvE и PvP.
function EnemyArrCreate() {
    for (i = 0; i < EnemyArrLength; i++) {
        EnemyArr[i] = new BatTemplate;
        EnemyArr[i].ID = i;
    }
    BattleCycle();
}

var battleWindow = document.getElementById('BattleWindow');
var Move = document.querySelector('.moveTab');
function StartBattle() {
    if (choosenArr.length === 0) {
        return;
    }
    TimmateArr = Object.assign([], choosenArr);
    document.querySelector('.BattleMenu').style.display = "none";
    battleWindow.style.display = 'grid';
    Move.style.display = 'flex';
    EnemyArrCreate();
    DownloadAll();
}

function CheckHP(face) {
    if (face.HP <= 0) {
        face.characterDiv.style.display = 'none';
        Del(face);
    }
}

function ShowHP(face) {
    face.characterHPcount.innerHTML = face.HP + '/' + face.maxHP;
    face.characterHP.style.width = face.HP / face.maxHP * 100 + 'px';
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
}

function CreateHTML(face) {
    face.characterDiv = document.createElement('div');
    face.characterAvatar = document.createElement('img');
    face.characterHPborder = document.createElement('div');
    face.characterHP = document.createElement('div');
    face.characterHPcount = document.createElement('p');
}

function DownloadToBattle(field, face) {
    ShowHP(face);
    face.characterHPborder.classList.add('HPbarBorder');
    face.characterHP.classList.add('HPbar');
    face.characterHPcount.classList.add('HPcount');
    face.characterAvatar.classList.add('battleImg');
    face.characterAvatar.setAttribute('src', face.Avatar);
    if (face.attack === "Enemy") {
        face.characterDiv.classList.add('ENEMY');
    } else {
        face.characterDiv.classList.add('TIMMATE');
    }
    face.characterHPborder.append(face.characterHPcount);
    face.characterDiv.append(face.characterAvatar, face.characterHPborder, face.characterHP);
    field.appendChild(face.characterDiv);
}

function LightAttacked(face) {
    face.characterDiv.classList.add('AttackedCharacter');
    setTimeout(function() {
        face.characterDiv.classList.remove('AttackedCharacter');
    }, 400);
}

var spliced;
function Del(face) {
    if (face.attack === "Timmate") {
        spliced = TimmateArr.indexOf(face);
        TimmateArr.splice(spliced, 1);
        StopBattle();
        return;
    } else {
        spliced = EnemyArr.indexOf(face);
        EnemyArr.splice(spliced, 1);
        StopBattle();
        return;
    }
}

function StopBattle() {
    if (EnemyArr.length === 0 || TimmateArr.length === 0) {
        EnemyArr.length = 0;
        TimmateArr.length = 0;
        for (i = 0; i < choosenArr.length; i++) {
            choosenArr[i].HP = choosenArr[i].maxHP;
            ChoosenHeroes[i].removeChild(ChoosenHeroes[i].firstChild);//под сомнением
        }
        choosenArr.length = 0;
        moveCounter = 1;
        counter = -1;
        setTimeout(function() {
            alert("Бой окончен!");
            battleWindow.style.display = 'none';
            Move.style.display = 'none';
            document.getElementById('StartLocation').style.display = "block";
            TimmateField.replaceChildren();
            EnemyField.replaceChildren();
            Move.innerHTML = "Текущий ход: " + moveCounter;
        }, 500);
    }
}

function SortGlobalArr() {
    return GlobalArr = [...TimmateArr, ...EnemyArr].sort((a,b) => a.SPD > b.SPD ? -1 : 1);
}

var Min = 0;
var Max;
var rand;
function RandomNumber(a, b) {
    rand = a - 0.5 + Math.random() * (b - a + 1);
    rand = Math.round(rand);
    return rand;
}

var moveCounter = 1;
Move.innerHTML = "Текущий ход: " + moveCounter;
var counter = -1;
function BattleCycle() {
    SortGlobalArr();
    counter++;
    if (counter === GlobalArr.length) {
        counter = -1;
        moveCounter += 1;
        Move.innerHTML = "Текущий ход: " + moveCounter;
        BattleCycle();
        return;
    }
    GlobalArr[counter].Start();
}