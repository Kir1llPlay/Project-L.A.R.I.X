function StandartAttack(target, user) {
    target.HP -= user.ATK;
    CheckHP(target);
    ShowHP(target);
}

function Bombing(targetArr, user) {
    let clone = Object.assign([], targetArr);
    for (i = 0; i < clone.length; i++) {
        LightAttacked(clone[i]);
        clone[i].HP -= user.ATK * user.DMGM;
        CheckHP(clone[i]);
        ShowHP(clone[i]);
    }
}

function Bite(target, user) {
    target.HP -= user.ATK * user.DMGM;
    CheckHP(target);
    ShowHP(target);
}