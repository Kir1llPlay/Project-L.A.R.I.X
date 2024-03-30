var ResourcesInv = {}

var EquipmentInv = {}

function itemsCheck(loot) {
    for (i = 0; i < loot.length; i++) {
        if (RandomNumber(0, 100) <= loot[i][2]) {
            itemsRecieve(loot[i][0], RandomNumber(1, loot[i][1]));
        }
    }
}

function itemsRecieve(item, itemCount) {
    let currentInv;
    let currentInvLength;
    let isDistributed = false;
    if (item.isEquiped !== undefined) {
        currentInv = EquipmentInv;
    } else {
        currentInv = ResourcesInv;
    }
    currentInvLength = Object.keys(currentInv).length;
    for (i = 0; i <= currentInvLength; i++) {
        if (currentInv[i] !== undefined) {
            if (currentInv[i][0].name === item.name) {
                currentInv[i][1] += itemCount;
                isDistributed = true;
                inventoryRendering(currentInv[i], i);
                break;
            }
        }
    }
    if (isDistributed !== true) {
        for (j = 0; j <= currentInvLength; j++) {
            if (currentInv[j] === undefined) {
                currentInv[j] = [item, itemCount];
                inventoryRendering(currentInv[j], j);
                break;
            }
        }
    }
}

function inventoryRendering(invList, num) {
    let cells;
    if (invList[0].name = EquipmentInv[num][0].name) {
        cells = document.querySelectorAll('.equipInvCell');
    } else {
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
}

function equip(equipment) {
    for (i = 0; i < Player.equipmentSlots.length; i++) {
        if (Player.equipmentSlots[i][0] === equipment.slot) {
            Player.equipmentSlots[i][1] = equipment;
            equipment.isEquiped = true;
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
    if (equipment.ATK !== undefined) {
        Player.ATK -= equipment.ATK;
    }
    if (equipment.DEF !== undefined) {
        Player.DEF -= equipment.DEF;
    }
    if (equipment.SPD !== undefined) {
        Player.SPD -= equipment.SPD;
    }
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
    equipmentBTN.disabled = true;
    resourcesBTN.disabled = false;
    equipmentUI.style.display = "flex";
}

function openResources() {
    resourcesBTN.disabled = true;
    equipmentBTN.disabled = false;
    equipmentUI.style.display = "none";
}