var Player = new PlayerInfo;
var arravel = new Arravel;
var Bat = new BatTemplate;
let hill = new Hills;
let hill2 = new Hills2;
let forest = new Forest;
let road = new Road;
let road2 = new Road2;
let crossroad = new Crossroad;
let wideRoad = new WideRoad;
let foothill = new Foothills;
let ascensionMountains = new AscensionToTheMountains;
let mountains = new Mountains;
let mountains2 = new Mountains2;
let roadMountains = new RoadToTheMountains;
let roadMountains2 = new RoadToTheMountains2;
let entranceAlnoyar = new EntranceToTheAlnoyar;
let alnoyar = new Alnoyar;
let entrancePolyteria = new EntranceToThePolyteria;
let tradeSquare = new TradeSquare;
let mainSquare = new MainSquare;
let brook = new Brook;
let brook2 = new Brook2;
let riverBank = new RiverBank;
let river = new River;
let ascensionRiver = new AscensionRiver;
let alderForest = new AlderForest;
let alderForest2 = new AlderForest2;
let entranceCaves = new EntranceToTheCaves;
let caves = new Caves;
let plains = new Plains;
let plains2 = new Plains2;
hill.address.push(hill2);
hill2.address.push(hill, forest);
forest.address.push(entranceAlnoyar, hill2, foothill, road);
road.address.push(forest, riverBank, road2);
road2.address.push(road, crossroad);
crossroad.address.push(road2, roadMountains, wideRoad);
roadMountains.address.push(roadMountains2, crossroad);
roadMountains2.address.push(mountains2, roadMountains);
wideRoad.address.push(crossroad, plains, entrancePolyteria);
plains.address.push(plains2, wideRoad);
plains2.address.push(plains);
riverBank.address.push(ascensionRiver, road, river);
river.address.push(riverBank);
ascensionRiver.address.push(brook2, riverBank);
foothill.address.push(ascensionMountains, forest, entranceCaves);
ascensionMountains.address.push(mountains, foothill);
mountains.address.push(ascensionMountains);
mountains2.address.push(roadMountains2);
entranceCaves.address.push(foothill, caves);
caves.address.push(entranceCaves);
entranceAlnoyar.address.push(alnoyar, forest);
alnoyar.address.push(brook, alderForest, entranceAlnoyar);
entrancePolyteria.address.push(tradeSquare, wideRoad);
tradeSquare.address.push(mainSquare, entrancePolyteria);
mainSquare.address.push(tradeSquare);
brook.address.push(brook2, alnoyar);
brook2.address.push(brook, ascensionRiver);
alderForest.address.push(alderForest2, alnoyar);
alderForest2.address.push(alderForest);

let tableRows = document.getElementsByTagName('tr');
let table = document.getElementById('table');
let tab = document.querySelector('.currentLocation');
var cellsArrayRow = [];
var cellsArray = [];

function Render(location) {
    table.style.backgroundImage = location.locationPic;
    tab.innerHTML = "Текущая локация: " + location.locationName;
    for (i = 0; i < tableRows.length; i++) {
        for (j = 0; j < 5; j++) {
            cellsArrayRow[j] = document.createElement('td');
            tableRows[i].append(cellsArrayRow[j]);
        }
        cellsArray.push(...cellsArrayRow);
    }
    CreateObj(location);
    MoveTable(location);
}

var g = -1;
var a = 0;
function CreateObj(location) {
    g++;
    if (location.cellsArrayContent[g] === 0) {
        CreateObj(location);
        return;
    }
    if (g === location.cellsArrayContent.length) {
        g = -1;
        a = 0;
        DownloadObj(location);
        return;
    }
    if (location.cellsArrayContent[g].look === undefined) {
        let text = document.createElement('p');
        text.classList.add('transitObjText');
        text.innerHTML = location.address[a].locationName;
        let tra = location.cellsArrayContent[g].img = document.createElement('div');
        tra.append(text);
        tra.className = a;
        tra.classList.add('transitObj');
        a++;
        CreateObj(location);
        return;
    }
    location.cellsArrayContent[g].img = document.createElement('img');
    location.cellsArrayContent[g].img.setAttribute('src', location.cellsArrayContent[g].look);
    location.cellsArrayContent[g].img.classList.add('tableElement');
    if (location.cellsArrayContent[g].OpenedHeroes !== undefined) {
        location.cellsArrayContent[g].img.classList.add('player');
    }
    if (location.cellsArrayContent[g].attack === "Timmate") {
        location.cellsArrayContent[g].img.classList.add('tim');
    } else {
        location.cellsArrayContent[g].img.classList.add('en');
    }
    CreateObj(location);
}
var k = -1;
function DownloadObj(location) {
    k++;
    if (location.cellsArrayContent[k] === 0) {
        DownloadObj(location);
        return;
    }
    if (k === location.cellsArrayContent.length) {
        k = -1;
        return;
    }
    cellsArray[k].append(location.cellsArrayContent[k].img);
    DownloadObj(location);
}

var actionBar = document.querySelector('.actionCard');
function MoveTable(location) {
    let tds = document.getElementsByTagName('td');
    
    for (i = 0; i < tds.length; i++) {
        tds[i].addEventListener('click', function() {
            if (this.innerHTML == 0) {
                this.appendChild(Player.img);
                return; // здесь не происходит изменения массива location.cellsArrayContent, что вызовет трудности в будущем(т.к. не запоминает содержимое), я пытался сделать так, чтобы он изменялся, но не вышло(ошибки не выдавало и массив не изменялся)
            } else if (this.childNodes[0].classList.contains('0')) {
                trans.transition(location.address[0], cellsArray, cellsArrayRow);
                return;
            } else if (this.childNodes[0].classList.contains('1')) {
                trans.transition(location.address[1], cellsArray, cellsArrayRow);
                return;
            } else if (this.childNodes[0].classList.contains('2')) {
                trans.transition(location.address[2], cellsArray, cellsArrayRow);
                return;
            } else if (this.childNodes[0].classList.contains('3')) {
                trans.transition(location.address[3], cellsArray, cellsArrayRow);
                return;
            } else {
                if (this.childNodes[0].classList.contains('player')) return;
                actionBar.style.display = "block";
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

var HeroTable = document.querySelector('.heroes');
function ChooseHeroes() {
    actionBar.style.display = "none";
    document.getElementById('StartLocation').style.display = "none";
    document.querySelector('.BattleMenu').style.display = "flex";
    RenderHeroTable();
}

function RenderHeroTable() {
    if (document.querySelectorAll('.elems').length === Player.OpenedHeroes.length) {
        return;
    }
    for (i = 0; i < Player.OpenedHeroes.length; i++) {
        let HeroImg = document.createElement('img');
        HeroImg.setAttribute('src', Player.OpenedHeroes[i].Avatar);
        HeroImg.classList.add('openImg');
        let HeroDiv = document.createElement('div');
        HeroDiv.classList.add('elems');
        HeroDiv.append(HeroImg);
        HeroTable.append(HeroDiv);
    }
    HeroTableEventListener();
}

var choosenArr = [];
var ChoosenHeroes = document.getElementsByClassName('choosenElems');
function HeroTableEventListener() {
    let HeroDivs = document.getElementsByClassName('elems');
    
    for (i = 0; i < HeroDivs.length; i++) {
        HeroDivs[i].addEventListener('click', function() {
            this.classList.toggle('choosen');
            let index = Array.from(HeroDivs).indexOf(this);
            if (!document.querySelectorAll('.elems')[index].classList.contains('choosen')) {
                for (j = 0; j < 3; j++) {
                    if (ChoosenHeroes[j].firstChild !== null) {
                        if (ChoosenHeroes[j].firstChild.classList[0] === String(index)) {
                            RemoveChoosenHero(ChoosenHeroes[j].firstChild);
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
    let stop;
    for (j = 0; j < 3; j++) {
        if (ChoosenHeroes[j].firstChild !== null ) {
            if (ChoosenHeroes[j].firstChild.classList[0] === String(num)) {
                stop = true;
            }
        }
    }
    if (stop === true) return;
    for (i = 0; i < 3; i++) {
        if (ChoosenHeroes[i].firstChild === null) {
            if (!document.querySelectorAll('.elems')[num].classList.contains('choosen')) {
                return;
            }
            let copyImg = document.createElement('img');
            copyImg.setAttribute('src', Player.OpenedHeroes[num].Avatar);
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

function HideGrid() {
    let td = document.querySelectorAll('td');
    for (i = 0; i < td.length; i++) {
        if (td[i].style.border === "none") {
            td[i].style.border = "solid 1px black";
        } else {
            td[i].style.border = "none";
        }
    }
}

Render(hill);