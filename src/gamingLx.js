var Player;

// для локации и инвенатря /////// for location and inventory
const tableRows = document.getElementsByTagName('tr');
const table = document.getElementById('table');
const tab = document.querySelector('.currentLocation');
var cellsArrayRow = [];
var cellsArray = [];
var ResourcesInv = [];
var EquipmentInv = [];
var stopSave = false;
var gridHided = false;
var locationBattleData;


var locArr = [];
fetch('locations.json')
.then(response => response.json())
.then(jsonData => {
    locArr = jsonData; checkLocalStorage()});

function transition(address) {
    for (j = 0; j < cellsArray.length; j++) {
        cellsArray[j].parentNode.removeChild(cellsArray[j]);
    }
    cellsArray.length = 0;
    for (i = 0; i < locArr.length; i++) {
        if (locArr[i].locationName === address) {
            Render(locArr[i]);
            break;
        }
    }
}

async function checkLocalStorage() {
    if (localStorage.location !== undefined) {
        stopSave = true;
        if (localStorage.equipmentInv !== undefined) {
            await itemsCheck(JSON.parse(localStorage.equipmentInv));
        }
        if (localStorage.resourceInv !== undefined) {
            await itemsCheck(JSON.parse(localStorage.resourceInv));
        }
        if (localStorage.XP !== undefined && localStorage.XP !== "NaN") {
            document.getElementById('forXP').innerHTML = "Опыт: " + Number(localStorage.XP);
        } else {
            document.getElementById('forXP').innerHTML = "Опыт: " + 0;
        }
        await createPlayer();
        Render(JSON.parse(localStorage.location));
        document.getElementById('playerName').innerHTML = JSON.parse(localStorage.userDataLX).name;
        stopSave = false;
        return;
    }
    await createPlayer();
    Render(locArr[0]);
}

const createPlayer = async function() {
    const playerData = JSON.parse(localStorage.userDataLX);
    const responce = await fetch(`Fractions/${playerData.fraction}.json`);
    const data = await responce.json();
    Player = new PlayerBase(1, playerData.name, playerData.fraction, "timmate", data.maxHP, data.maxMP, data.ATK, data.SPD, data.DEF, data.DEX, data.ACC, "Avatars/Player.png", "InGamePic/Maat.png");
    Player.setXP(Number(localStorage.XP));
    Player.setPhysique(data.physique);
    Player.setSkills([["magicAttack", 50]]);
    if (localStorage.characters !== undefined) {
        for (i = 0; i < JSON.parse(localStorage.characters).length; i++) {
            await createHero(JSON.parse(localStorage.characters)[i]);
        }
    }
    document.getElementById('playerImg').setAttribute("src", Player.getInGamePic());
}

function saveHero() {
    let copyArr = [];
    for (i = 1; i < Player.getOpenedHeroes().length; i++) {
        copyArr.push(Player.getOpenedHeroes()[i].getID())
    }
    if (copyArr.length === 0) return;
    localStorage.characters = JSON.stringify(copyArr);
}

function Render(location) {
    locationBattleData = location.battleData;
    localStorage.setItem("location", JSON.stringify(location));
    table.style.backgroundImage = location.locationPic;
    tab.innerHTML = "Текущая локация: " + location.locationName;
    for (i = 0; i < tableRows.length; i++) {
        for (j = 0; j < 5; j++) {
            cellsArrayRow[j] = document.createElement('td');
            tableRows[i].append(cellsArrayRow[j]);
        }
        cellsArray.push(...cellsArrayRow);
    }
    if (gridHided !== false) {
        HideGrid();
    }
    cellsArrayRow.length = 0;
    CreateObj(location);
    MoveTable(location);
}

var g = -1;
var a = 0;
async function CreateObj(location) {
    g++;
    if (g === location.cellsArrayContent.length) {
        g = -1;
        a = 0;
        return;
    }
    if (location.cellsArrayContent[g] === 0) {
        CreateObj(location);
        return;
    }
    if (location.cellsArrayContent[g] === "transition") {
        let text = document.createElement('div');
        text.classList.add('transitObjText');
        text.innerHTML = location.address[a];
        let tra = document.createElement('div');
        tra.append(text);
        tra.className = a;
        tra.classList.add('transitObj');
        cellsArray[g].appendChild(tra);
        a++;
        CreateObj(location);
        return;
    } else {
        let InGameImg = document.createElement('img');
        InGameImg.classList.add('tableElement');
        if (location.cellsArrayContent[g] === 1) {
            InGameImg.setAttribute('src', Player.getInGamePic());
            InGameImg.classList.add('tim', 'player');
            Player.img = InGameImg;
            cellsArray[g].append(Player.img);
            CreateObj(location);
            return;
        } else {
            const responce = await fetch(`Characters/${location.cellsArrayContent[g][0]}.json`);
            const data = await responce.json();
            if (location.cellsArrayContent[g][1] === "timmate") {
                InGameImg.classList.add('tim');
            } else {
                InGameImg.classList.add('en');
            }
            InGameImg.setAttribute('src', data.inGamePic);
        }
        cellsArray[g].append(InGameImg);
        CreateObj(location);
    }
}

var actionBar = document.querySelector('.actionCard');
function MoveTable(location) {
    for (i = 0; i < cellsArray.length; i++) {
        cellsArray[i].addEventListener('click', function() {
            if (this.innerHTML == 0) {
                this.appendChild(Player.img);
                return;
            } else if (this.childNodes[0].classList.contains('0')) {
                transition(location.address[0]);
                return;
            } else if (this.childNodes[0].classList.contains('1')) {
                transition(location.address[1]);
                return;
            } else if (this.childNodes[0].classList.contains('2')) {
                transition(location.address[2]);
                return;
            } else if (this.childNodes[0].classList.contains('3')) {
                transition(location.address[3]);
                return;
            } else {
                if (this.childNodes[0].classList.contains('player')) return;
                actionBar.style.display = "block";
                document.querySelector('.blockAll').style.display = "block";
                document.addEventListener('click', function(e) {
                    if (e.target === document.querySelector('.blockAll') && actionBar.style.display === "block") {
                        closeCard();
                    }
                });
                if (this.childNodes[0].classList.contains('tim')) {
                    if (this.childNodes[0].classList.contains('player')) {
                        return;
                    }
                    let dialog = document.createElement('p');
                    dialog.innerHTML = "Поговорить";
                    dialog.classList.add('Pg_btn');
                    if (document.querySelector('.Dialog')) {
                        return;
                    }
                    let bt = document.createElement('button');
                    bt.classList.add('Dialog');
                    bt.setAttribute('onclick', 'StartDialog()');
                    bt.append(dialog);
                    actionBar.append(bt);
                } else {
                    let pt = document.createElement('p');
                    pt.innerHTML = "Вступить в бой";
                    pt.classList.add('Pg_btn');
                    if (document.querySelector('.BattleChoose')) {
                        return;
                    }
                    let bt = document.createElement('button');
                    bt.classList.add('BattleChoose');
                    bt.setAttribute('onclick', 'ChooseHeroes()');
                    bt.append(pt);
                    actionBar.append(bt);
                }
            }
        });
    }
}

function closeCard() {
    actionBar.style.display = "none";
    document.querySelector('.blockAll').style.display = "none";
    if (document.querySelector('.BattleChoose')) {
        document.querySelector('.BattleChoose').parentNode.removeChild(document.querySelector('.BattleChoose'));
    } else {
        document.querySelector('.Dialog').parentNode.removeChild(document.querySelector('.Dialog'));
    }
}

function StartDialog() {
    closeCard();
    document.querySelector('.DialogMenu').style.display = "flex";
    document.querySelector('.filter').style.display = "block";
}

function closeDialog() {
    console.log("aboba")
    document.querySelector('.DialogMenu').style.display = "none";
    document.querySelector('.filter').style.display = "none";
}

var HeroTable = document.querySelector('.heroes');
function ChooseHeroes() {
    closeCard();
    document.getElementById('StartLocation').style.display = "none";
    document.querySelector('.BattleMenu').style.display = "flex";
    RenderHeroTable();
}

function closeBattle() {
    document.getElementById('StartLocation').style.display = "block";
    document.querySelector('.BattleMenu').style.display = "none";
}

function RenderHeroTable() {
    if (document.querySelectorAll('.elems').length === Player.getOpenedHeroes().length) {
        return;
    }
    HeroTable.replaceChildren();
    for (i = 0; i < Player.getOpenedHeroes().length; i++) {
        let HeroImg = document.createElement('img');
        HeroImg.setAttribute('src', Player.getOpenedHeroes()[i].getAvatar());
        HeroImg.classList.add('openImg');
        let HeroDiv = document.createElement('div');
        HeroDiv.classList.add('elems');
        HeroDiv.append(HeroImg);
        HeroTable.appendChild(HeroDiv);
    }
    addClasses();
    HeroTableEventListener();
}

function addClasses() {
    for (i = 0; i < 3; i++) {
        if (ChoosenHeroes[i].firstChild !== null) {
            let num = ChoosenHeroes[i].firstChild.classList[0];
            document.querySelectorAll('.elems')[num].classList.add('choosen');
        }
    }
}

var choosenArr = [];
var ChoosenHeroes = document.getElementsByClassName('choosenElems');
function HeroTableEventListener() {
    let HeroDivs = document.getElementsByClassName('elems');
    for (i = 0; i < HeroDivs.length; i++) {
        HeroDivs[i].addEventListener('click', function() {
            this.classList.toggle('choosen');
            let index = Array.from(HeroDivs).indexOf(this);
            if (!HeroDivs[index].classList.contains('choosen')) {
                for (j = 0; j < 3; j++) {
                    if (ChoosenHeroes[j].firstChild !== null) {
                        if (ChoosenHeroes[j].firstChild.classList[0] === String(index)) {
                            RemoveChoosenHero(ChoosenHeroes[j].firstChild);
                            break;
                        }
                    }
                }
                return;
            }
            DownloadChoosenHero(index);
        })
    }
}

function DownloadChoosenHero(num) {
    let stop = false;
    for (j = 0; j < 3; j++) {
        if (ChoosenHeroes[j].firstChild === null) break;
        if (ChoosenHeroes[j].firstChild.classList[0] === String(num)) {
            stop = true;
            break;
        }
        if (j === 2) {
            document.querySelectorAll('.elems')[num].classList.remove('choosen');
            stop = true;
            break;
        }
    }
    if (stop === true) return;
    for (i = 0; i < 3; i++) {
        if (ChoosenHeroes[i].firstChild === null) {
            if (!document.querySelectorAll('.elems')[num].classList.contains('choosen')) {
                return;
            }
            let copyImg = document.createElement('img');
            copyImg.setAttribute('src', Player.getOpenedHeroes()[num].getAvatar());
            copyImg.classList.add('openImg');
            let copyDiv = document.createElement('div');
            copyDiv.className = num;
            copyDiv.classList.add('forFunc');
            copyDiv.append(copyImg);
            ChoosenHeroes[i].appendChild(copyDiv);
            ChoosenHeroes[i].firstChild.addEventListener('click', function() {
                document.querySelectorAll('.elems')[num].classList.remove('choosen');
                RemoveChoosenHero(this);
            })
            break;
        }
    }
}

function RemoveChoosenHero(elem) {
    elem.parentNode.removeChild(elem);
}

function HideGrid(whereCalled) {
    if (whereCalled === "button") {
        if (gridHided === false) {
            gridHided = true;
            document.querySelector('.gridP').innerHTML = "Вернуть сетку";
        } else {
            gridHided = false;
            document.querySelector('.gridP').innerHTML = "Скрыть сетку";
        }
    }
    let td = document.querySelectorAll('td');
    for (i = 0; i < td.length; i++) {
        if (td[i].style.border === "none") {
            td[i].style.border = "solid 1px #363C42";
        } else {
            td[i].style.border = "none";
        }
    }
}