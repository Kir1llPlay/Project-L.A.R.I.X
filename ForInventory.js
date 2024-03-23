var inv = document.querySelector('.inventory');

function OpenInventory() {
    inv.style.display = "block";
    document.getElementById('StartLocation').style.display = "none";
}

function CloseInventory() {
    inv.style.display = "none";
    document.getElementById('StartLocation').style.display = "block";
}