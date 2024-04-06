var ResourcesInv = {}

var EquipmentInv = {}

function itemsCheck(loot) {
    for (i = 0; i < loot.length; i++) {
        if (RandomNumber(0, 100) <= loot[i][2]) {
            itemsRecieve(loot[i][0], RandomNumber(1, loot[i][1]));
        }
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
        return;
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
    })
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
}

var equipmentBTN = document.getElementById('equipmentBtn');
var resourcesBTN = document.getElementById('resourcesBtn');
var equipmentUI = document.getElementById('equipmentInv');

function openEquipment() {
    typeOfInv = "equipment";
    equipmentBTN.disabled = true;
    resourcesBTN.disabled = false;
    equipmentUI.style.display = "flex";
}

function openResources() {
    typeOfInv = "resource";
    resourcesBTN.disabled = true;
    equipmentBTN.disabled = false;
    equipmentUI.style.display = "none";
}

var profileDiv = document.querySelector('.Profile');
function openProfile() {
    document.getElementById('StartLocation').style.display = "none";
    profileDiv.style.display = "block";
}

function closeProfile() {
    document.getElementById('StartLocation').style.display = "block";
    profileDiv.style.display = "none";
}