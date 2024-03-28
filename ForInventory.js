class ResourcesInv {
    
}

class EquipmentInv {
    
}

var sword = new Bokken;

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
equip(sword);

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