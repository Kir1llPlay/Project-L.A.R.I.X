var ResourcesInv = {};
var EquipmentInv = {};

function getXP(xpArr) {
    Player.XP += RandomNumber(xpArr[0], xpArr[1]);
}

function itemsCheck(loot) {
    let iter = 0;
    while (iter < loot.length) {
        if (RandomNumber(0, 100) <= loot[iter][2]) {
            itemsRecieve(loot[iter][0], RandomNumber(1, loot[iter][1]));
        }
        iter++;
    }
}

var typeOfInv;
function itemsRecieve(item, itemCount) {
    let currentInv;
    let currentInvLength;
    let isDistributed = false;
    if (item.isEquiped !== undefined) {
        currentInv = EquipmentInv;
        typeOfInv = "equipment";
    } else {
        currentInv = ResourcesInv;
        typeOfInv = "resource";
    }
    currentInvLength = Object.keys(currentInv).length;
    for (i = 0; i <= currentInvLength; i++) {
        if (currentInv[i] !== undefined) {
            if (currentInv[i][0].name === item.name) {
                currentInv[i][1] += itemCount;
                isDistributed = true;
                if (currentInv[i][1] === 0) {
                    currentInv[i] = undefined;
                }
                inventoryRendering(currentInv[i], i, typeOfInv);
                break;
            }
        }
    }
    if (isDistributed !== true) {
        for (j = 0; j <= currentInvLength; j++) {
            if (currentInv[j] === undefined) {
                currentInv[j] = [item, itemCount];
                inventoryRendering(currentInv[j], j, typeOfInv);
                break;
            }
        }
    }
}

var invCard = document.querySelector('.inventoryCard');
var invCardImg = document.getElementById('inventoryImg');
var invCardName = document.getElementById('inventoryName');
function inventoryRendering(invList, num, typeOfInv) {
    let cells;
    if (typeOfInv === "equipment") {
        cells = document.querySelectorAll('.equipInvCell');
    } else {
        cells = document.querySelectorAll('.resInvCell');
    }
    if (invList === undefined || invList[1] === 0) {
        cells[num].firstChild.parentNode.removeChild(cells[num].firstChild);
        return;
    }

    if (cells[num].firstChild !== null) {
        cells[num].firstChild.childNodes[1].innerHTML = invList[1];
        return;
    }
    let invDiv = document.createElement('div');
    let invImg = document.createElement('img');
    let invCount = document.createElement('p');
    invDiv.append(invImg, invCount);
    invImg.style.width = "100%";
    invImg.style.height = "100%";
    invDiv.style.width = "100%";
    invDiv.style.height = "100%";
    invCount.style.position = "absolute";
    invDiv.style.position = "relative";
    invCount.style.left = "5%";
    invCount.style.top = "50%";
    invCount.style.fontSize = "12px";
    invImg.setAttribute('src', invList[0].Avatar);
    invCount.innerHTML = invList[1];
    cells[num].appendChild(invDiv);
    cells[num].addEventListener('click', function() {
        if (this.firstChild === null) return;
        invCardImg.setAttribute('src', invList[0].Avatar);
        invCardImg.style.height = invCardImg.style.width;
        invCardName.innerHTML = invList[0].name;
        invCard.style.display = "block";
        document.querySelector('.blockAll').style.display = "block";
        closeInvCard();
        if (invList[0].isEquiped !== undefined) {
            let invBtn = document.createElement('button');
            let invBtnP = document.createElement('p');
            if (invCard.childNodes[5] === undefined) {
                invBtnP.classList.add('Pg_btn');
                invBtnP.innerHTML = "Надеть";
                invBtn.append(invBtnP);
                invCard.appendChild(invBtn);
            }
            invBtn.addEventListener('click', function() {
                equip(invList[0]);
                invCard.style.display = "none";
                document.querySelector('.blockAll').style.display = "none";
                invBtn.parentNode.removeChild(invBtn);
            })
        }
        if (invList[0].type !== undefined) {
            if (invList[0].type !== "shards") return;
            let invBtn = document.createElement('button');
            let invBtnP = document.createElement('p');
            if (invCard.childNodes[5] === undefined && invList[1] >= invList[0].needfulCount) {
                invBtnP.classList.add('Pg_btn');
                invBtnP.innerHTML = "Активировать";
                invBtn.append(invBtnP);
                invCard.appendChild(invBtn);
            }
            invBtn.addEventListener('click', function() {
                activateHero(invList[0]);
                invCard.style.display = "none";
                document.querySelector('.blockAll').style.display = "none";
                invBtn.parentNode.removeChild(invBtn);
            })
        }
    })
}

function activateHero(hero) {
    let newHero = new hero.thatHero;
    let overlap = false;
    for (i = 0; i < Player.OpenedHeroes.length; i++) {
        if (Player.OpenedHeroes[i].name === newHero.name) {
            overlap = true;
            break;
        }
    }
    if (overlap === true) return;
    itemsRecieve(hero, -5);
    newHero.attack = "Timmate";
    Player.OpenedHeroes.push(newHero);
}

function equip(equipment) {
    let resump;
    for (i = 0; i < Player.equipmentSlots.length; i++) {
        if (Player.equipmentSlots[i][0] === equipment.slot) {
            if (Player.equipmentSlots[i][1] === undefined) {
                Player.equipmentSlots[i][1] = equipment;
                equipment.isEquiped = true;
            } else {
                alert("Данный слот занят");
                resump = false;
            }
        }
    }
    if (resump === false) return;
    if (equipment.OpenedSkills.length > 0) {
        for (j = 0; j < equipment.OpenedSkills.length; j++) {
            for (k = 0; k <= Player.WeaponSkills.length; k++) {
                if (Player.WeaponSkills[k] !== equipment.OpenedSkills[j]) {
                    Player.WeaponSkills.push(equipment.OpenedSkills[j]);
                    break;
                }
            }
        }
    }
    if (equipment.ATK !== undefined) {
        Player.ATK += equipment.ATK;
    }
    if (equipment.DEF !== undefined) {
        Player.DEF += equipment.DEF;
    }
    if (equipment.SPD !== undefined) {
        Player.SPD += equipment.SPD;
    }
    itemsRecieve(equipment, -1);
    equipmentRendering(equipment);
}

function takeOff(equipment) {
    if (!equipment.isEquiped) {
        return;
    }
    for (i = 0; i < Player.equipmentSlots.length; i++) {
        if (Player.equipmentSlots[i][0] === equipment.slot) {
            Player.equipmentSlots[i][1] = undefined;
            equipment.isEquiped = false;
        }
    }
    if (equipment.OpenedSkills.length > 0) {
        for (j = 0; j < equipment.OpenedSkills.length; j++) {
            for (k = 0; k <= Player.WeaponSkills.length; k++) {
                if (Player.WeaponSkills[k] === equipment.OpenedSkills[j]) {
                    Player.WeaponSkills.splice(k, 1);
                    break;
                }
            }
        }
    }
    if (equipment.ATK !== undefined) {
        Player.ATK -= equipment.ATK;
    }
    if (equipment.DEF !== undefined) {
        Player.DEF -= equipment.DEF;
    }
    if (equipment.SPD !== undefined) {
        Player.SPD -= equipment.SPD;
    }
    itemsRecieve(equipment, 1);
    equipmentUnrendering(equipment);
}

function equipmentRendering(equipment) {
    let forEquip = document.querySelectorAll('.forEquipment');
    for (i = 0; i < forEquip.length; i++) {
        if (forEquip[i].id === equipment.slot) {
            for (j = 3; j < forEquip[i].childElementCount + 2; j++) {
                if (forEquip[i].childNodes[j].firstChild === null) {
                    let equipImg = document.createElement('img');
                    equipImg.style.width = "100%";
                    equipImg.style.height = "100%";
                    equipImg.setAttribute('src', equipment.Avatar);
                    forEquip[i].childNodes[j].append(equipImg);
                    forEquip[i].childNodes[j].addEventListener('click', function() {
                        if (this.firstChild === null) return;
                        for (k = 0; k < Player.equipmentSlots.length; k++) {
                            if (Player.equipmentSlots[k][0] = forEquip[k].id) break;
                        }
                        invCardImg.setAttribute('src', Player.equipmentSlots[k][1].Avatar);
                        invCardName.innerHTML = Player.equipmentSlots[k][1].name;
                        invCard.style.display = "block";
                        document.querySelector('.blockAll').style.display = "block";
                        closeInvCard();
                        if (invCard.childNodes[5] !== undefined) return;
                            let takeOffBtn = document.createElement('button');
                            let takeOffP = document.createElement('p');
                            takeOffP.classList.add('Pg_btn');
                            takeOffP.innerHTML = "Снять предмет";
                            takeOffBtn.append(takeOffP);
                            invCard.appendChild(takeOffBtn);
                            takeOffBtn.addEventListener('click', function() {
                                takeOff(Player.equipmentSlots[k][1]);
                                invCard.style.display = "none";
                                document.querySelector('.blockAll').style.display = "none";
                                takeOffBtn.parentNode.removeChild(takeOffBtn);
                            })
                    });
                    break;
                }
            }
        }
    }
}

function equipmentUnrendering(equipment) {
    let forEquip = document.querySelectorAll('.forEquipment');
    for (i = 0; i < forEquip.length; i++) {
        if (forEquip[i].id === equipment.slot) {
            for (j = 3; j < forEquip[i].childElementCount + 2; j++) {
                forEquip[i].childNodes[j].firstChild.parentNode.removeChild(forEquip[i].childNodes[j].firstChild);
                break;
            }
            break;
        }
    }
}

function closeInvCard() {
    document.addEventListener('click', function(e) {
        if (e.target === document.querySelector('.blockAll') && invCard.style.display === "block") {
            document.querySelector('.blockAll').style.display = "none";
            invCard.style.display = "none";
            if (invCard.childNodes[5] !== undefined) {
                invCard.childNodes[5].parentNode.removeChild(invCard.childNodes[5]);
            }
        }
    });
}

var inv = document.querySelector('.inventory');

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
}

var equipmentBTN = document.getElementById('equipmentBtn');
var resourcesBTN = document.getElementById('resourcesBtn');
var equipmentUI = document.getElementById('equipmentInv');
var resourceUI = document.getElementById('resourceInv');

function openEquipment() {
    typeOfInv = "equipment";
    equipmentBTN.disabled = true;
    resourcesBTN.disabled = false;
    resourceUI.style.display = "none";
    equipmentUI.style.display = "flex";
}

function openResources() {
    typeOfInv = "resource";
    resourcesBTN.disabled = true;
    equipmentBTN.disabled = false;
    equipmentUI.style.display = "none";
    resourceUI.style.display = "flex";
}

var profileDiv = document.querySelector('.Profile');
function openProfile() {
    CloseInventory();
    document.getElementById('StartLocation').style.display = "none";
    profileDiv.style.display = "block";
    document.getElementById('forXP').innerHTML = "Опыт: " + Player.XP;
}

function closeProfile() {
    document.getElementById('StartLocation').style.display = "block";
    profileDiv.style.display = "none";
}

var charactersDiv = document.querySelector('.CharactersMenu');
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
    if (document.querySelectorAll('.unlockedHeroes').length === Player.OpenedHeroes.length) {
        return;
    }
    UnlockedHeroesDiv.replaceChildren();
    for (i = 1; i < Player.OpenedHeroes.length; i++) {
        let HeroImg = document.createElement('img');
        HeroImg.setAttribute('src', Player.OpenedHeroes[i].Avatar);
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
        AllOpenHeroes[i].addEventListener('click', function() {
            let index = Array.from(AllOpenHeroes).indexOf(this);
            openHeroCard(index + 1);
        })
    }
}

function openHeroCard(index) {
    charactersDiv.style.display = "none";
    document.querySelector('.HeroCard').style.display = "block";
    document.querySelector('.heroImg').setAttribute('src', Player.OpenedHeroes[index].look);
    document.querySelector('.heroName').innerHTML = Player.OpenedHeroes[index].name;
    document.querySelector('.heroLevel').innerHTML = "Уровень: " + Player.OpenedHeroes[index].curLevel + "/" + Player.OpenedHeroes[index].maxLevel;
    showHeroStats(index);
    if (Player.OpenedHeroes[index].curLevel < Player.OpenedHeroes[index].maxLevel) {
        document.getElementById('upgradeButton').style.display = "block";
        document.getElementById('upgradeButton').onclick = () => {
            levelUpHero(index);
        }
    }
}

function showHeroStats(index) {
    document.querySelector('.forHP').innerHTML = "ХП: " + Player.OpenedHeroes[index].maxHP;
    document.querySelector('.forMP').innerHTML = "Мана: " + Player.OpenedHeroes[index].maxMP;
    document.querySelector('.forATK').innerHTML = "АТК: " + Player.OpenedHeroes[index].ATK;
    document.querySelector('.forDEF').innerHTML = "Защита: " + Player.OpenedHeroes[index].DEF;
    document.querySelector('.forDEX').innerHTML = "Ловкость: " + Player.OpenedHeroes[index].DEX;
    document.querySelector('.forACC').innerHTML = "Точность: " + Player.OpenedHeroes[index].ACC;
    document.querySelector('.forSPD').innerHTML = "Скорость: " + Player.OpenedHeroes[index].SPD;
}

function showNewHeroStats(typeOfStat, countOfStat, index) {
    if (typeOfStat === "hp") {
        document.querySelector('.forHP').innerHTML = "ХП: " + Player.OpenedHeroes[index].maxHP + `<font color="green"> +${countOfStat}</font>`;
    }
    if (typeOfStat === "mp") {
        document.querySelector('.forMP').innerHTML = "Мана: " + Player.OpenedHeroes[index].maxMP + `<font color="green"> +${countOfStat}</font>`;
    }
    if (typeOfStat === "atk") {
        document.querySelector('.forATK').innerHTML = "АТК: " + Player.OpenedHeroes[index].ATK + `<font color="green"> +${countOfStat}</font>`;
    }
    if (typeOfStat === "def") {
        document.querySelector('.forDEF').innerHTML = "Защита: " + Player.OpenedHeroes[index].DEF + `<font color="green"> +${countOfStat}</font>`;
    }
    if (typeOfStat === "dex") {
        document.querySelector('.forDEX').innerHTML = "Ловкость: " + Player.OpenedHeroes[index].DEX + `<font color="green"> +${countOfStat}</font>`;
    }
    if (typeOfStat === "acc") {
        document.querySelector('.forACC').innerHTML = "Точность: " + Player.OpenedHeroes[index].ACC + `<font color="green"> +${countOfStat}</font>`;
    }
    if (typeOfStat === "spd") {
        document.querySelector('.forSPD').innerHTML = "Скорость: " + Player.OpenedHeroes[index].SPD + `<font color="green"> +${countOfStat}</font>`;
    }
}

function closeHeroCard() {
    document.querySelector('.HeroCard').style.display = "none";
    document.getElementById('upgradeButton').style.display = "none";
    charactersDiv.style.display = "block";
}

function levelUpHero(index) {
    for (i = 0; i <= Object.keys(ResourcesInv).length; i++) {
        if (ResourcesInv[i] === undefined) return;
        if (ResourcesInv[i][0].name === Player.OpenedHeroes[index].neededToLevelUp[0].name) {
            if (ResourcesInv[i][1] >= Player.OpenedHeroes[index].neededToLevelUp[1]) {
                itemsRecieve(ResourcesInv[i][0], -5);
                levelUp(index);
            } else {
                alert("Недостаточно осколков персонажа");
            }
        }
    }
}

function levelUp(index) {
    showHeroStats(index);
    for (i = 0; i < Player.OpenedHeroes[index].levelUp.length; i++) {
        if (Player.OpenedHeroes[index].levelUp[i][0] === "hp") {
            showNewHeroStats("hp", Player.OpenedHeroes[index].levelUp[i][1], index);
            Player.OpenedHeroes[index].HP += Player.OpenedHeroes[index].levelUp[i][1];
            Player.OpenedHeroes[index].maxHP += Player.OpenedHeroes[index].levelUp[i][1];
        }
        if (Player.OpenedHeroes[index].levelUp[i][0] === "mp") {
            showNewHeroStats("mp", Player.OpenedHeroes[index].levelUp[i][1], index);
            Player.OpenedHeroes[index].ATK += Player.OpenedHeroes[index].levelUp[i][1];
        }
        if (Player.OpenedHeroes[index].levelUp[i][0] === "atk") {
            showNewHeroStats("atk", Player.OpenedHeroes[index].levelUp[i][1], index);
            Player.OpenedHeroes[index].ATK += Player.OpenedHeroes[index].levelUp[i][1];
        }
        if (Player.OpenedHeroes[index].levelUp[i][0] === "def") {
            showNewHeroStats("def", Player.OpenedHeroes[index].levelUp[i][1], index);
            Player.OpenedHeroes[index].ATK += Player.OpenedHeroes[index].levelUp[i][1];
        }
        if (Player.OpenedHeroes[index].levelUp[i][0] === "dex") {
            showNewHeroStats("dex", Player.OpenedHeroes[index].levelUp[i][1], index);
            Player.OpenedHeroes[index].DEX += Player.OpenedHeroes[index].levelUp[i][1];
        }
        if (Player.OpenedHeroes[index].levelUp[i][0] === "acc") {
            showNewHeroStats("acc", Player.OpenedHeroes[index].levelUp[i][1], index);
            Player.OpenedHeroes[index].DEX += Player.OpenedHeroes[index].levelUp[i][1];
        }
        if (Player.OpenedHeroes[index].levelUp[i][0] === "spd") {
            showNewHeroStats("spd", Player.OpenedHeroes[index].levelUp[i][1], index);
            Player.OpenedHeroes[index].SPD += Player.OpenedHeroes[index].levelUp[i][1];
        }
        if (Player.OpenedHeroes[index].levelUp[i][0] === "skills") {
            Player.OpenedHeroes[index].ChoosenSkills.push(Player.OpenedHeroes[index].levelUp[i][1]);
        }
    }
    Player.OpenedHeroes[index].curLevel += 1;
    document.querySelector('.heroLevel').innerHTML = "Уровень: " + Player.OpenedHeroes[index].curLevel + "/" + Player.OpenedHeroes[index].maxLevel;
    if (Player.OpenedHeroes[index].curLevel === Player.OpenedHeroes[index].maxLevel) {
        document.getElementById('upgradeButton').style.display = "none";
    }
    setTimeout(function() {
        showHeroStats(index);
    }, 3000);
}