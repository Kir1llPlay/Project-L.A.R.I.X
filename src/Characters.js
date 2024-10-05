class CharacterBase {
    #isAlive = true;
    #ID;
    #name;
    #fraction;
    #team;
    #HP;
    #maxHP;
    #MP;
    #maxMP;
    #ATK;
    #SPD;
    #DEF;
    #DEX;
    #ACC;
    #avatar;
    #inGamePic;
    #skills = [];
    #buffs = {
        "maxHP": 0,
        "maxMP": 0,
        "ATK": 0,
        "SPD": 0,
        "DEF": 0,
        "DEX": 0,
        "ACC": 0
    };
    #buffsInPercents = {
        "maxHP": 1,
        "maxMP": 1,
        "ATK": 1,
        "SPD": 1,
        "DEF": 1,
        "DEX": 1,
        "ACC": 1
    };

    constructor(ID, name, fraction, team, maxHP, maxMP, ATK, SPD, DEF, DEX, ACC, avatar, inGamePic) {
        this.#ID = ID;
        this.#name = name;
        this.#fraction = fraction;
        this.#team = team;
        this.#HP = maxHP;
        this.#maxHP = maxHP;
        this.#MP = maxMP;
        this.#maxMP = maxMP;
        this.#ATK = ATK;
        this.#SPD = SPD;
        this.#DEF = DEF;
        this.#DEX = DEX;
        this.#ACC = ACC;
        this.#avatar = avatar;
        this.#inGamePic = inGamePic;
    }

    getIsAlive() {
        return this.#isAlive;
    }

    getID() {
        return this.#ID;
    }

    getName() {
        return this.#name;
    }

    getFraction() {
        return this.#fraction;
    }

    getTeam() {
        return this.#team;
    }

    getHP() {
        return this.#HP;
    }

    getMaxHP() {
        return this.#maxHP;
    }

    getMP() {
        return this.#MP;
    }

    getMaxMP() {
        return this.#maxMP;
    }

    getATK() {
        return this.#ATK;
    }

    getSPD() {
        return this.#SPD;
    }

    getDEF() {
        return this.#DEF;
    }

    getDEX() {
        return this.#DEX;
    }

    getACC() {
        return this.#ACC;
    }

    getAvatar() {
        return this.#avatar;
    }

    getInGamePic() {
        return this.#inGamePic;
    }

    getSkills() {
        return this.#skills;
    }

    getBuffs() {
        return this.#buffs;
    }

    setBuffs(buffs) {
        for (i = 0; i < Object.keys(buffs).length; i++) {
            this.#buffs[Object.keys(buffs)[i]] += buffs[Object.keys(buffs)[i]];
        }
    }

    removeBuffs(buffs) {
        for (i = 0; i < Object.keys(buffs).length; i++) {
            this.#buffs[Object.keys(buffs)[i]] -= buffs[Object.keys(buffs)[i]];
        }
    }

    getBuffsInPercents() {
        return this.#buffsInPercents;
    }

    checkHP() {
        if (this.#HP > (this.#maxHP + this.#buffs["maxHP"]) * this.#buffsInPercents["maxHP"]) {
            this.#HP = (this.#maxHP + this.#buffs["maxHP"]) * this.#buffsInPercents["maxHP"];
            return;
        }
        if (this.#HP <= 0) this.dead();
    }

    checkMP() {
        if (this.#MP > (this.#maxMP + this.#buffs["maxMP"]) * this.#buffsInPercents["maxMP"]) {
            this.#MP = (this.#maxMP + this.#buffs["maxMP"]) * this.#buffsInPercents["maxMP"];
            return;
        }
        if (this.#MP <= 0) this.#MP = 0;
    }

    loseHP(damage, acc) {
        if ((this.#DEF + this.#buffs["DEF"]) * this.#buffsInPercents["DEF"] >= damage) return;
        const diff = acc / (this.#DEX + this.#buffs["DEX"]) * this.#buffsInPercents["DEX"] * 100;
        if (diff < 100) {
            if (RandomNumber(0, 100) > diff) return; 
        }
        this.checkHP();
        this.#HP -= (damage - this.#DEF);
        LightAttacked(this);
        this.checkHP();
        ShowHP(this);
    }

    setHP(hp) {
        this.#HP = hp;
    }

    loseMP(spending) {
        this.checkMP();
        this.#MP -= spending;
        this.checkMP();
        ShowMP(this);
    }
    
    setMP(mp) {
        this.#MP = mp;
    }

    setSkills(skills) {
        skills.forEach((skill) => this.#skills.push(skill));
    }

    action(actionName, targetArr, timmateArr) {
        actionName(this, targetArr, timmateArr);
    }

    dead() {
        this.#isAlive = false;
        battle.findDead();
        this.characterDiv.style.display = "none";
    }
}

class PlayerBase extends CharacterBase {
    #XP = 0;
    #openedHeroes = [this];
    #equipmentSlots = [ ["mainhand"], ["head"], ["minorhand"], ["chestplate"], ["body"], ["cloak"], ["ring"], ["belt"], ["ring"], ["ring"], ["legs"], ["ring"], ["ring"], ["feet"], ["ring"] ];
    #physique;

    getXP() {
        return this.#XP;
    }

    setXP(newXP) {
        this.#XP += newXP;
    }

    getOpenedHeroes() {
        return this.#openedHeroes;
    }

    setOpenedHeroes(newHero) {
        this.#openedHeroes.push(newHero);
    }

    getPhysique() {
        return this.#physique;
    }

    setPhysique(newPhysique) {
        this.#physique = newPhysique;
    }

    getEquipment() {
        return this.#equipmentSlots;
    }

    setEquipment(equipment) {
        for (i = 0; i < this.#equipmentSlots.length; i++) {
            if (this.#equipmentSlots[i][0] === equipment.getSlot() & this.#equipmentSlots[i][1] === undefined) {
                this.#equipmentSlots[i].push(equipment);
                this.setBuffs(equipment.getBuffs());
                break;
            }
        }
    }

    removeEquipment(num) {
        this.removeBuffs(this.#equipmentSlots[num][1].getBuffs());
        this.#equipmentSlots[num].length = 1;
    }
}

class EnemyBase extends CharacterBase {
    #gainedXP;
    #loot;
    #gainedLoot = [];

    getGainedXP() {
        return RandomNumber(this.#gainedXP[0], this.#gainedXP[1]);
    }

    setGainedXP(newGainedXP) {
        this.#gainedXP = newGainedXP;
    }

    getLoot() {
        this.#loot.forEach((loot) => {
            if (RandomNumber(0, 100) <= loot[3]) {
                this.#gainedLoot.push([loot[0], RandomNumber(loot[1], loot[2])])
            }
        })
        itemsCheck(this.#gainedLoot, "battle");
    }

    setLoot(newLoot) {
        this.#loot = newLoot;
    }
}