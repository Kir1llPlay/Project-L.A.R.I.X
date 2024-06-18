const StandartAttack = function(target, user, targetArr, timmateArr) {
    if (target.DEF >= user.ATK) {
        return;
    }
    let diff = user.ACC / target.DEX * 100;
    if (diff < 100) {
        if (RandomNumber(0, 100) > diff) return; 
    }
    LightAttacked(target);
    target.HP -= (user.ATK - target.DEF);
    CheckHP(target);
}

const Bombing = function(target, user, targetArr, timmateArr) {
    for (i = 0; i < targetArr.length; i++) {
        if (targetArr[i].DEF >= user.ATK) {
            return;
        }
        let diff = user.ACC / targetArr[i].DEX * 100;
        if (diff < 100) {
            if (RandomNumber(0, 100) > diff) return; 
        }
        LightAttacked(targetArr[i]);
        targetArr[i].HP -= (user.ATK * 2 - targetArr[i].DEF);
    }
    for (j = 0; j < targetArr.length; j++) {
        CheckHP(targetArr[j]);
    }
}

const Bite = function(target, user, targetArr, timmateArr) {
    if (target.DEF >= user.ATK) {
        return;
    }
    let diff = user.ACC / target.DEX * 100;
    if (diff < 100) {
        if (RandomNumber(0, 100) > diff) return; 
    }
    LightAttacked(target);
    target.HP -= (user.ATK * 2 - target.DEF);
    CheckHP(target);
}

const SwordAttack = function(target, user, targetArr, timmateArr) {
    if (target.DEF >= user.ATK) {
        return;
    }
    let diff = user.ACC / target.DEX * 100;
    if (diff < 100) {
        if (RandomNumber(0, 100) > diff) return; 
    }
    LightAttacked(target);
    target.HP -= (user.ATK * 2 - target.DEF);
    CheckHP(target);
}

const MagicAttack = function(target, user, targetArr, timmateArr) {
    let cost = 2;
    if (user.MP === 0 || user.MP - cost < 0) {
        StandartAttack(target, user, targetArr, timmateArr);
        return;
    }
    if (target.DEF >= user.ATK) {
        return;
    }
    let diff = user.ACC / target.DEX * 100;
    if (diff < 100) {
        if (RandomNumber(0, 100) > diff) return; 
    }
    LightAttacked(target);
    user.MP -= cost;
    target.HP -= (Math.round((user.ATK * 2 - target.DEF) * magicBoost(user, cost)));
    CheckHP(target);
    ShowMP(user);
}

const list = [
    [Bombing, 30],
    [Bite, 50],
    [SwordAttack, 100],
    [MagicAttack, 50],
];

function magicBoost(user, cost) {
    if (user.MP > cost) {
        return user.MP / 100 + 1;
    } else {
        return user.MP / cost;
    }
}