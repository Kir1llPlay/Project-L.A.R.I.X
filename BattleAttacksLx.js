const StandartAttack = function(target, user, targetArr, timmateArr) {
    target.HP -= user.ATK;
    CheckHP(target);
    ShowHP(target);
}

const Bombing = function(target, user, targetArr, timmateArr) {
    let clone = Object.assign([], targetArr);
    for (i = 0; i < clone.length; i++) {
        LightAttacked(clone[i]);
        clone[i].HP -= user.ATK * 2;
        CheckHP(clone[i]);
        ShowHP(clone[i]);
    }
}

const Bite = function(target, user, targetArr, timmateArr) {
    target.HP -= user.ATK * 2;
    CheckHP(target);
    ShowHP(target);
}

const list = [
    [Bombing, 50],
    [Bite, 50],
];