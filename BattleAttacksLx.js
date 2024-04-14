const StandartAttack = function(target, user, targetArr, timmateArr) {
    if (target.DEF >= user.ATK) {
        return;
    }
    target.HP -= (user.ATK - target.DEF);
    CheckHP(target);
}

const Bombing = function(target, user, targetArr, timmateArr) {
    for (i = 0; i < targetArr.length; i++) {
        if (targetArr[i].DEF >= user.ATK) {
            return;
        }
        LightAttacked(targetArr[i]);
        targetArr[i].HP -= (user.ATK * 2 - targetArr[i].DEF);
        for (j = 0; j < targetArr.length; j++) {
            if (targetArr[j] === undefined) {
                while (targetArr[j] !== undefined) {
                    j--;
                }
                CheckHP(targetArr[j]);
            }
            CheckHP(targetArr[j]);
        }
    }
}

const Bite = function(target, user, targetArr, timmateArr) {
    if (target.DEF >= user.ATK) {
        return;
    }
    target.HP -= (user.ATK * 2 - target.DEF);
    CheckHP(target);
}

const SwordAttack = function(target, user, targetArr, timmateArr) {
    if (target.DEF >= user.ATK) {
        return;
    }
    target.HP -= (user.ATK * 2 - target.DEF);
    CheckHP(target);
}

const list = [
    [Bombing, 30],
    [Bite, 50],
    [SwordAttack, 100]
];