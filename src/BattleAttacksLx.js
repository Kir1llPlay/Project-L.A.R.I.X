const StandartAttack = function(user, targetArr, timmateArr) {
    const target = targetArr[RandomNumber(0, targetArr.length - 1)];
    target.loseHP((user.getATK() + user.getBuffs()["ATK"]) * user.getBuffsInPercents()["ATK"], (user.getACC + user.getBuffs()["ACC"]) * user.getBuffsInPercents()["ACC"]);
}

const Bombing = function(user, targetArr, timmateArr) {
    for (i = 0; i < targetArr.length; i++) {
        let target = targetArr[i];
        target.loseHP((user.getATK() + user.getBuffs()["ATK"]) * user.getBuffsInPercents()["ATK"] * 2, (user.getACC() + user.getBuffs()["ACC"]) * user.getBuffsInPercents()["ACC"]);
    }
}

const Bite = function(user, targetArr, timmateArr) {
    const target = targetArr[RandomNumber(0, targetArr.length - 1)];
    target.loseHP((user.getATK() + user.getBuffs()["ATK"]) * user.getBuffsInPercents()["ATK"] * 2, (user.getACC() + user.getBuffs()["ACC"]) * user.getBuffsInPercents()["ACC"]);
}

const SwordAttack = function(user, targetArr, timmateArr) {
    const target = targetArr[RandomNumber(0, targetArr.length - 1)];
    target.loseHP((user.getATK() + user.getBuffs()["ATK"]) * user.getBuffsInPercents()["ATK"] * 2, (user.getACC() + user.getBuffs()["ACC"]) * user.getBuffsInPercents()["ACC"]);
}

const MagicAttack = function(user, targetArr, timmateArr) {
    const cost = 2;
    if (user.getMP() === 0 || user.getMP() - cost < 0) {
        StandartAttack(user, targetArr, timmateArr);
        return;
    }
    user.loseMP(cost);
    const target = targetArr[RandomNumber(0, targetArr.length - 1)];
    target.loseHP(Math.round((user.getATK() + user.getBuffs()["ATK"]) * user.getBuffsInPercents()["ATK"] * 2 * magicBoost(user.getMP(), cost)), (user.getACC() + user.getBuffs()["ACC"]) * user.getBuffsInPercents()["ACC"]);
}

const magicBoost = function(userMana, cost) {
    if (userMana > cost) {
        return userMana / 100 + 1;
    } else {
        return userMana / cost;
    }
}

const list = {
    "standartAttack": [StandartAttack],
    "bite": [Bite, "bite", "Укус", "Наносит х2 урона"],
    "bombing": [Bombing, "bombing", "Подрыв", "Наносит х2 урона по всем"],
    "swordAttack": [SwordAttack, "swordAttack", "Удар мечом", "Наносит х2 урона"],
    "magicAttack": [MagicAttack, "fireball", "Огненный шар", "Наносит х2 урона"]
};