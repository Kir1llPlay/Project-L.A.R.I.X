var ResourcesInv = {}

var EquipmentInv = {}

function itemsRecieve(item, itemCount) {
    let currentInv;
    let currentInvLength;
    let isDistributed;
    if (item.isEquipable === undefined) {
        currentInv = EquipmentInv;
    } else {
        currentInv = ResourcesInv;
    }
    currentInvLength = Object.keys(currentInv).length;
    for (i = 0; i <= currentInvLength; i++) {
        if (currentInv[i] !== undefined) {
            if (currentInv[i][0] === item) {
                currentInv[i][1] += itemCount;
                isDistributed = true;
                break;
            }
        }
    }
    if (isDistributed !== true) {
        for (j = 0; j <= currentInvLength; j++) {
            if (currentInv[j] !== undefined) return;
            currentInv[j] = [item, itemCount];
            break;
        }
    }
}

var sword = new Bokken;
itemsRecieve(sword, 1);
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