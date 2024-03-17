var Player = new PlayerInfo;
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
let polyteria = new Polyteria;
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
hill2.address.push(forest);
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
entrancePolyteria.address.push(polyteria, wideRoad);
polyteria.address.push(entrancePolyteria);
brook.address.push(brook2, alnoyar);
brook2.address.push(brook, ascensionRiver);
alderForest.address.push(alderForest2, alnoyar);
alderForest2.address.push(alderForest);

let tableRows = document.getElementsByTagName('tr');
let table = document.getElementById('table');
let tab = document.querySelector('.currentLocation');

function Render(location) {
    table.style.backgroundImage = location.locationPic;
    tab.innerHTML = "Текущая локация: " + location.locationName;
    for (i = 0; i < tableRows.length; i++) {
        for (j = 0; j < 5; j++) {
            location.cellsArrayRow[j] = document.createElement('td');
            tableRows[i].append(location.cellsArrayRow[j]);
        }
        location.cellsArray.push(...location.cellsArrayRow);
    }
    CreateObj(location);
    MoveTable(location);
}

var g = -1;
var a = 0;
function CreateObj(location) {
    g++;
    if (location.cellsArrayContent[g] === 0) {
        CreateObj(location); // на этой строчке что-то стало выдавать ошибку, 1 раз вылетает
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
    location.cellsArray[k].append(location.cellsArrayContent[k].img);
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
                trans.transition(location.address[0], location.cellsArray, location.cellsArrayRow);
                return;
            } else if (this.childNodes[0].classList.contains('1')) {
                trans.transition(location.address[1], location.cellsArray, location.cellsArrayRow);
                return;
            } else if (this.childNodes[0].classList.contains('2')) {
                trans.transition(location.address[2], location.cellsArray, location.cellsArrayRow);
                return;
            } else if (this.childNodes[0].classList.contains('3')) {
                trans.transition(location.address[3], location.cellsArray, location.cellsArrayRow);
                return;
            } else {
                actionBar.style.display = "block";
                if (this.childNodes[0].classList.contains('tim')) {
                    return;
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
    let removeBT = document.querySelector('.BattleChoose');
    removeBT.parentNode.removeChild(removeBT);
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
        let Hero = document.createElement('img');
        Hero.setAttribute('src', Player.OpenedHeroes[i].Avatar);
        Hero.classList.add('openImg');
        let HeroDiv = document.createElement('div');
        HeroDiv.classList.add('elems');
        HeroDiv.append(Hero);
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
            let copyHeroDiv = this.cloneNode(true);
            let index = Array.from(HeroDivs).indexOf(this);
            if (choosenArr.length === 3) {
                return;
            }
            if (choosenArr.includes(Player.OpenedHeroes[index])) {
                choosenArr.splice(choosenArr.indexOf(Player.OpenedHeroes[index]), 1);
                DownloadChoosenHero(copyHeroDiv, this);
                return;
            }
            choosenArr.push(Player.OpenedHeroes[index]);
            DownloadChoosenHero(copyHeroDiv, this);
        })
    }
}

function DownloadChoosenHero(copy, orig) {
    for (i = 0; i < 3; i++) {
        if (ChoosenHeroes[i].firstChild === null) {
            copy.classList.remove('elems', 'choosen');
            copy.classList.add('forFunc');
            ChoosenHeroes[i].appendChild(copy);
            ChoosenHeroes[i].firstChild.addEventListener('click', function() {
                orig.classList.remove('choosen');
                RemoveChoosenHero(i);
            });
            return;
        } else {
            RemoveChoosenHero(i);
            return;
        }
    }
}

function RemoveChoosenHero(n) {
    ChoosenHeroes[n].removeChild(ChoosenHeroes[n].firstChild);
    choosenArr.splice(n, 1);
}

function HideGrid() {
    let td = document.querySelectorAll('td');
    for (i = 0; i < td.length; i++) {
        if (td[i].style.border != "none") {
            td[i].style.border = "none";
        } else {
            td[i].style.border = "solid 1px black";
        }
    }
}

Render(hill);