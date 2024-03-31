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
    let typeOfInv;
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
        let numI;
        for (i = 0; i < cells.length; i++) {
            if (cells[i] = this) {
                numI = i;
                break;
            }
        }
        //event();
        document.getElementById('inventoryImg').setAttribute('src', invList[numI].Avatar);
        document.getElementById('inventoryImg').style.height = document.getElementById('inventoryImg').style.width;
        document.getElementById('inventoryName').innerHTML = invList[numI].name;
        invCard.style.display = "block";
        if (invList[numI].isEquiped !== undefined) {
            if (invCard.childNodes[5] !== undefined) return;
            let invBtn = document.createElement('button');
            let invBtnP = document.createElement('p');
            invBtnP.classList.add('Pg_btn');
            invBtnP.innerHTML = "Надеть";
            invBtn.append(invBtnP);
            invCard.appendChild(invBtn);
            invBtn.addEventListener('click', function() {
                equip(invList[numI]);
                invCard.style.display = "none";
                invBtn.parentNode.removeChild(invBtn);
            })
        }
    })
}

function event() {
    document.addEventListener('click', function(e) {
        console.log(e);
        if (e.target !== invCard && invCard.style.display === "block") {
            invCard.style.display = "none";
        }
    });
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
                    break;
                }
            }
        }
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

var profileDiv = document.querySelector('.Profile');
function openProfile() {
    document.getElementById('StartLocation').style.display = "none";
    profileDiv.style.display = "block";
}

function closeProfile() {
    document.getElementById('StartLocation').style.display = "block";
    profileDiv.style.display = "none";
}