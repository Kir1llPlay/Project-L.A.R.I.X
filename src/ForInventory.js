const invCard = document.querySelector('.inventoryCard');
const invCardImg = document.getElementById('inventoryImg');
const invCardName = document.getElementById('inventoryName');
const inv = document.querySelector('.inventory');
const equipmentBTN = document.getElementById('equipmentBtn');
const resourcesBTN = document.getElementById('resourcesBtn');
const equipmentUI = document.getElementById('equipmentInv');
const resourceUI = document.getElementById('resourceInv');
const profileDiv = document.querySelector('.Profile');
const charactersDiv = document.querySelector('.CharactersMenu');

function getXP(xp) {
    Player.setXP(xp);
    exp += xp;
    localStorage.XP = Player.getXP();
}

function giveTest() {
    itemsCheck([["trainingSword", 1], ["batShards", 5]]);
}

async function itemsCheck(loot, whereItCalled) {
    let item;
    for (h = 0; h < loot.length; h++) {
        const responce = await fetch(`Items/${loot[h][0]}.json`);
        const data = await responce.json();
        if (itemsAndTypes[loot[h][0]] === "equipment") {
            item = new EquipmentBase(data.name, loot[h][0], data.rarity, data.avatar, itemsAndTypes[loot[h][0]]);
            item.setSlot(data.slot);
            item.setBuffs(data.buffs);
            item.setPhysique(data.physique);
            item.setSkills(data.skills);
        } else if (itemsAndTypes[loot[h][0]] === "shards") {
            item = new ShardBase(data.name, loot[h][0], data.rarity, data.avatar, itemsAndTypes[loot[h][0]]);
            item.setThatHeroID(data.thatHeroID);
            item.setNeedfulCountForActivation(data.needfulCountForActivation);
        } else {
            item = new ItemBase(data.name, loot[h][0], data.rarity, data.avatar, itemsAndTypes[loot[h][0]]);
        }
        itemsRecieve(item, loot[h][1]);
        if (whereItCalled === "battle") {
            inventoryForLootWindow(item, loot[h][1]);
        }
    }
}

function itemsRecieve(item, itemCount) {
    let currentInv;
    let isDistributed = false;
    let typeOfInv = itemsAndTypes[item.getID()];
    if (typeOfInv === "equipment") {
        currentInv = EquipmentInv;
    } else {
        currentInv = ResourcesInv;
    }
    for (j = 0; j < currentInv.length; j++) {
        if (currentInv[j] !== undefined) {
            if (currentInv[j][0].getID() === item.getID()) {
                currentInv[j][1] += itemCount;
                isDistributed = true;
                if (currentInv[j][1] === 0) {
                    deleteElementFromInv(currentInv[j], j, typeOfInv);
                    currentInv.splice(j, 1);
                    break;
                }
                inventoryRendering(currentInv[j], j, typeOfInv);
                break;
            }
        }
    }
    if (isDistributed === false) {
        currentInv.push([item, itemCount]);
        inventoryRendering(currentInv[currentInv.length - 1], currentInv.length - 1, typeOfInv);
    }
    if (stopSave === true) return;
    let copyArr = [];
    for (k = 0; k < currentInv.length; k++) {
        copyArr.push([currentInv[k][0].getID(), currentInv[k][1]]);
    }
    if (typeOfInv === "equipment") {
        localStorage["equipmentInv"] = JSON.stringify(copyArr);
    } else {
        localStorage["resourceInv"] = JSON.stringify(copyArr);
    }
}

function deleteElementFromInv(invList, num, typeOfInv) {
    let cells;
    if (typeOfInv === "equipment") {
        cells = document.getElementById('equipmentInv');
    } else {
        cells = document.getElementById('resourceInv');
    }
    if (invList[1] === 0) {
        cells.childNodes[num].parentNode.removeChild(cells.childNodes[num]);
    }
}

function inventoryRendering(invList, num, typeOfInv) {
    let cells;
    if (typeOfInv === "equipment") {
        cells = document.getElementById('equipmentInv');
    } else {
        cells = document.getElementById('resourceInv');
    }
    if (invList[1] === 0) {
        cells.childNodes[num].parentNode.removeChild(cells.childNodes[num]);
        return;
    }
    if (cells.childNodes[num] !== undefined) {
        cells.childNodes[num].childNodes[1].innerHTML = invList[1];
        return;
    }
    let invDiv = document.createElement('div');
    let invImg = document.createElement('img');
    let invCount = document.createElement('p');
    if (typeOfInv === "equipment") {
        invDiv.classList.add('equipInvCell');
    } else {
        invDiv.classList.add('resInvCell');
    }
    invDiv.append(invImg, invCount);
    invImg.style.width = "100%";
    invImg.style.height = "100%";
    invCount.style.position = "absolute";
    invCount.style.left = "5%";
    invCount.style.top = "50%";
    invCount.style.fontSize = "12px";
    invImg.setAttribute('src', invList[0].getAvatar());
    invCount.innerHTML = invList[1];
    cells.appendChild(invDiv);
    cells.childNodes[num].addEventListener('click', function () {
        invCardImg.setAttribute('src', invList[0].getAvatar());
        invCardImg.style.height = invCardImg.style.width;
        invCardName.innerHTML = invList[0].getName() + ` x${invList[1]}`;
        invCard.style.display = "flex";
        document.querySelector('.blockAll').style.display = "block";
        closeInvCard();
        let invBtn = document.createElement("button");
        let invBtnP = document.createElement('p');
        if (invList[0].getType() === "equipment") {
            invBtn.classList.add('inventoryBtn')
            invBtnP.classList.add('Pg_btn')
            invBtn.append(invBtnP);
            invBtnP.innerHTML = "Надеть";
            document.querySelector('.forEquipment').style.display = "flex";
            showEquipmentStats(invList[0]);
            showSkills(document.querySelector('.equipmentSkillsBlock'), invList[0]);
            if (checkPhysique(invList[0]) === false) return;
            invBtn.addEventListener('click', function () {
                equip(invList[0]);
                invCard.style.display = "none";
                document.querySelector('.blockAll').style.display = "none";
                document.querySelector('.statsOfEquipment').innerHTML = "";
                document.querySelector('.forEquipment').style.display = "none";
                invBtn.parentNode.removeChild(invBtn);
            });
            document.querySelector('.forButton').appendChild(invBtn);
            return;
        }
        if (invList[0].getType() !== "shards") return;
        document.getElementById('inventoryNeedfulCount').innerHTML = "До активации: " + invList[1] + "/" + invList[0].getNeedfulCountForActivation();
        document.querySelector('.forShards').style.display = "flex";
        if (invList[1] >= invList[0].getNeedfulCountForActivation()) {
            invBtn.classList.add('inventoryBtn')
            invBtnP.classList.add('Pg_btn')
            invBtn.append(invBtnP);
            invBtnP.innerHTML = "Активировать";
            invBtn.addEventListener('click', function () {
                activateHero(invList[0]);
                invCard.style.display = "none";
                document.querySelector('.blockAll').style.display = "none";
                document.querySelector('.forShards').style.display = "none";
                invBtn.parentNode.removeChild(invBtn);
            })
            document.querySelector('.forButton').appendChild(invBtn);
        }
    });
}

const showEquipmentStats = function(item) {
    let stats = document.querySelector('.statsOfEquipment');
    if (item.getBuffs()["ATK"] !== 0) {
        let P = document.createElement('p');
        P.classList.add('chP');
        P.innerHTML = "Урон: " + item.getBuffs()["ATK"];
        stats.append(P);
    }
    if (item.getBuffs()["SPD"] !== 0) {
        let P = document.createElement('p');
        P.classList.add('chP');
        P.innerHTML = "Скорость: " + item.getBuffs()["SPD"];
        stats.append(P);
    }
    if (item.getBuffs()["DEF"] !== 0) {
        let P = document.createElement('p');
        P.classList.add('chP');
        P.innerHTML = "Защита: " + item.getBuffs()["DEF"];
        stats.append(P);
    }
    if (item.getBuffs()["DEX"] !== 0) {
        let P = document.createElement('p');
        P.classList.add('chP');
        P.innerHTML = "Ловкость: " + item.getBuffs()["DEX"];
        stats.append(P);
    }
    if (item.getBuffs()["ACC"] !== 0) {
        let P = document.createElement('p');
        P.classList.add('chP');
        P.innerHTML = "Точность: " + item.getBuffs()["ACC"];
        stats.append(P);
    }
}

const showSkills = function(whereShow, whoShows) {
    whereShow.innerHTML = "";
    for (k = 0; k < whoShows.getSkills().length; k++) {
        let stats = `<div class="skillDiv">
        <div class="skillHeader">
        <img class="skillImg" src="AvatarsForSkills/${list[whoShows.getSkills()[k][0]][1]}.png">
        <p class="skillDescription">${list[whoShows.getSkills()[k][0]][2]}</p>
        </div>
        <p class="skillDescription">${list[whoShows.getSkills()[k][0]][3]}</p>
        </div>`;
        whereShow.innerHTML += stats;
    }
}

const checkPhysique = function(item) {
    if (Player.getPhysique() >= item.getPhysique()) {
        document.querySelector('.howManyHands').innerHTML = "1 рука";
    } else if (item.getPhysique() === Player.getPhysique() + 1) {
        document.querySelector('.howManyHands').innerHTML = "2 руки";
    } else {
        document.querySelector('.howManyHands').innerHTML = "Слишком тяжело!";
        return false;
    }
}

async function activateHero(shards) {
    let overlap = false;
    for (i = 0; i < Player.getOpenedHeroes().length; i++) {
        if (Player.getOpenedHeroes()[i].getID() === shards.getThatHeroID()) {
            overlap = true;
            break;
        }
    }
    if (overlap === true) return;
    itemsRecieve(shards, -5);
    await createHero(shards.getThatHeroID());
    saveHero();
}

const createHero = async function(heroID) {
    const responce = await fetch(`Characters/${heroID}.json`);
    const data = await responce.json();
    let newHero = new CharacterBase(data.id, data.name, data.fraction, "timmate", data.maxHP, data.maxMP, data.ATK, data.SPD, data.DEF, data.DEX, data.ACC, data.avatar, data.inGamePic);
    newHero.setSkills(data.skills);
    Player.setOpenedHeroes(newHero);
}

function equip(equipment) {
    let resump;
    for (a = 0; a < Player.getEquipment().length; a++) {
        if (Player.getEquipment()[a][0] === equipment.getSlot()) {
            if (Player.getEquipment()[a][1] === undefined) {
                Player.setEquipment(equipment);
                resump = true;
                break;
            } else {
                resump = false;
            }
        }
    }
    if (resump === false) {
        alert("Этот слот занят");
        return;
    }
    itemsRecieve(equipment, -1);
    equipmentRendering(equipment, a);
}

function takeOff(equipment, number) {
    Player.removeEquipment(number);
    itemsRecieve(equipment, 1);
    equipmentUnrendering(equipment, number);
}

function equipmentRendering(equipment, number) {
    let forEquip = document.querySelectorAll('.profileEquipCell');
    forEquip[number].removeChild(forEquip[number].firstChild);
    let equipImg = document.createElement('img');
    equipImg.style.width = "100%";
    equipImg.style.height = "100%";
    equipImg.setAttribute('src', equipment.getAvatar());
    forEquip[number].append(equipImg);
    forEquip[number].firstChild.addEventListener("click", function () {
        closeInvCard();
        invCardImg.setAttribute('src', equipment.getAvatar());
        invCardName.innerHTML = equipment.getName();
        invCard.style.display = "flex";
        document.querySelector('.forEquipment').style.display = "flex";
        checkPhysique(equipment);
        showEquipmentStats(equipment);
        document.querySelector('.blockAll').style.display = "block";
        let takeOffBtn = document.createElement('button');
        takeOffBtn.classList.add('inventoryBtn');
        let takeOffP = document.createElement('p');
        takeOffP.classList.add('Pg_btn');
        takeOffP.innerHTML = "Снять предмет";
        takeOffBtn.append(takeOffP);
        document.querySelector('.forButton').appendChild(takeOffBtn);
        takeOffBtn.addEventListener('click', function () {
            takeOff(Player.getEquipment()[number][1], number);
            invCard.style.display = "none";
            document.querySelector('.statsOfEquipment').innerHTML = "";
            document.querySelector('.blockAll').style.display = "none";
            takeOffBtn.parentNode.removeChild(takeOffBtn);
        })
    })
}

function equipmentUnrendering(equipment, number) {
    let forEquip = document.querySelectorAll('.profileEquipCell');
    forEquip[number].removeChild(forEquip[number].firstChild);
    let cellBackground = document.createElement('img');
    cellBackground.classList.add('bkg');
    cellBackground.setAttribute('src', `Assets/${equipment.getSlot()}Background.png`);
    forEquip[number].append(cellBackground);
}

function closeInvCard() {
    document.addEventListener('click', function (e) {
        if (e.target === document.querySelector('.blockAll') && invCard.style.display === "flex") {
            document.querySelector('.blockAll').style.display = "none";
            invCard.style.display = "none";
            if (document.querySelector('.inventoryBtn') !== null) {
                document.querySelector('.forButton').removeChild(document.querySelector('.inventoryBtn'));
            }
            document.querySelector('.forShards').style.display = "none";
            document.querySelector('.forEquipment').style.display = "none";
            document.querySelector('.statsOfEquipment').innerHTML = "";
        }
    });
}

function OpenInventory() {
    inv.style.display = "block";
    document.getElementById('StartLocation').style.display = "none";
}

function CloseInventory() {
    inv.style.display = "none";
    document.getElementById('StartLocation').style.display = "block";
    equipmentBTN.disabled = false;
    resourcesBTN.disabled = false;
    equipmentUI.style.display = "none";
    resourceUI.style.display = "none";
    document.querySelector('.forEqpt').style.display = "none";
    document.querySelector('.forRes').style.display = "none";
}

function openEquipment() {
    typeOfInv = "equipment";
    equipmentBTN.disabled = true;
    resourcesBTN.disabled = false;
    resourceUI.style.display = "none";
    equipmentUI.style.display = "flex";
    document.querySelector('.forEqpt').style.display = "block";
    document.querySelector('.forRes').style.display = "none";
}

function openResources() {
    typeOfInv = "resource";
    resourcesBTN.disabled = true;
    equipmentBTN.disabled = false;
    equipmentUI.style.display = "none";
    resourceUI.style.display = "flex";
    document.querySelector('.forEqpt').style.display = "none";
    document.querySelector('.forRes').style.display = "block";
}

function openProfile() {
    CloseInventory();
    document.getElementById('StartLocation').style.display = "none";
    profileDiv.style.display = "block";
    document.getElementById('forXP').innerHTML = "Опыт: " + Player.getXP();
    showSkills(document.querySelector('.playerSkillsBlock'),
        Player);
}

function closeProfile() {
    document.getElementById('StartLocation').style.display = "block";
    profileDiv.style.display = "none";
}

function openCharacters() {
    charactersDiv.style.display = "block";
    profileDiv.style.display = "none";
    renderOpenedHeroes();
}

function closeCharacters() {
    charactersDiv.style.display = "none";
    profileDiv.style.display = "block";
}

function renderOpenedHeroes() {
    let UnlockedHeroesDiv = document.querySelector('.OpenHeroes');
    if (document.querySelectorAll('.unlockedHeroes').length === Player.getOpenedHeroes().length) {
        return;
    }
    UnlockedHeroesDiv.replaceChildren();
    for (i = 1; i < Player.getOpenedHeroes().length; i++) {
        let HeroImg = document.createElement('img');
        HeroImg.setAttribute('src', Player.getOpenedHeroes()[i].getAvatar());
        HeroImg.classList.add('openImg');
        let HeroDiv = document.createElement('div');
        HeroDiv.classList.add('unlockedHeroes');
        HeroDiv.append(HeroImg);
        UnlockedHeroesDiv.appendChild(HeroDiv);
    }
    heroesListener();
}

function heroesListener() {
    let AllOpenHeroes = document.getElementsByClassName('unlockedHeroes');
    for (i = 0; i < AllOpenHeroes.length; i++) {
        AllOpenHeroes[i].addEventListener('click', function () {
            let index = Array.from(AllOpenHeroes).indexOf(this);
            openHeroCard(index + 1);
        })
    }
}

function openHeroCard(index) {
    charactersDiv.style.display = "none";
    document.querySelector('.HeroCard').style.display = "block";
    document.querySelector('.heroImg').setAttribute('src', Player.getOpenedHeroes()[index].getInGamePic());
    document.querySelector('.heroName').innerHTML = Player.getOpenedHeroes()[index].getName();
    showSkills(document.querySelector('.heroSkillsBlock'), Player.getOpenedHeroes()[index]);
    showHeroStats(index);
}

function showHeroStats(index) {
    document.querySelector('.forHP').innerHTML = "Здоровье: " + Player.getOpenedHeroes()[index].getMaxHP();
    document.querySelector('.forMP').innerHTML = "Мана: " + Player.getOpenedHeroes()[index].getMaxMP();
    document.querySelector('.forATK').innerHTML = "Урон: " + Player.getOpenedHeroes()[index].getATK();
    document.querySelector('.forDEF').innerHTML = "Защита: " + Player.getOpenedHeroes()[index].getDEF();
    document.querySelector('.forDEX').innerHTML = "Ловкость: " + Player.getOpenedHeroes()[index].getDEX();
    document.querySelector('.forACC').innerHTML = "Точность: " + Player.getOpenedHeroes()[index].getACC();
    document.querySelector('.forSPD').innerHTML = "Скорость: " + Player.getOpenedHeroes()[index].getSPD();
}

function closeHeroCard() {
    document.querySelector('.HeroCard').style.display = "none";
    charactersDiv.style.display = "block";
}