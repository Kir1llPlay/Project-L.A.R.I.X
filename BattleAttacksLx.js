const StandartAttack = function(target, user, targetArr, timmateArr) {
    target.HP -= (user.ATK - target.DEF);
    CheckHP(target);
    ShowHP(target);
}

const Bombing = function(target, user, targetArr, timmateArr) {
    let clone = Object.assign([], targetArr);
    for (i = 0; i < clone.length; i++) {
        LightAttacked(clone[i]);
        clone[i].HP -= (user.ATK * 2 - target.DEF);
        CheckHP(clone[i]);
        ShowHP(clone[i]);
    }
}

const Bite = function(target, user, targetArr, timmateArr) {
    target.HP -= (user.ATK * 2 - target.DEF);
    CheckHP(target);
    ShowHP(target);
}

const list = [
    [Bombing, 50],
    [Bite, 50],
];