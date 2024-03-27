class ResourcesInv {
    
}

class EquipmentInv {
    
}
var sword = new Bokken;
function equip(equipment) {
    equipment.isEquiped = true;
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
}