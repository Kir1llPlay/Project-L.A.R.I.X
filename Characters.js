class PlayerInfo {
    ID = 1;
    name = "Игрок";
    race = "human";
    attack = "Timmate";
    XP = 0;
    HP = 18;
    maxHP = 18;
    MP = 10;
    maxMP = 10;
    ATK = 2;
    SPD = 7;
    DEF = 0;
    DEX = 1;
    ACC = 1;
    Avatar = 'AvatarsLx/ArteonLx.png';
    look = 'InGamePicLx/Maat.png';
    OpenedHeroes = [this, new Bomber, new Spider];
    ChoosenSkills = [MagicAttack];
    WeaponSkills = [];
    equipmentSlots = [ ['majorHand'], ['minorHand'], ['head'], ];
}

class BatTemplate {
    ID = 2;
    name = "Летучая мышь";
    race = "beast";
    attack = "Enemy";
    HP = 7;
    maxHP = 7;
    MP = 0;
    maxMP = 0;
    ATK = 1;
    SPD = 5;
    DEF = 0;
    DEX = 1;
    ACC = 1;
    Avatar = 'AvatarsLx/BatLx.png';
    look = 'InGamePicLx/Bat.png';
    ChoosenSkills = [];
    WeaponSkills = [];
    XPGained = [1, 1];
    loot = [ [new Hide, 1, 30], [new TwoHandedSword, 1, 60], [new Bone, 1, 50], [new BatShards, 1, 90] ];
    curLevel = 1;
    maxLevel = 3;
    neededToLevelUp = [new BatShards, 5];
    levelUp = [ ['hp', 2], ['atk', 1], ['dex', 1], ['spd', 1], ['skills', Bite], ];
}

class Arravel {
    ID = 3;
    name = "Арравел";
    race = "beast";
    attack = "Timmate";
    HP;
    maxHP;
    MP = 0;
    maxMP = 0;
    ATK;
    SPD;
    DEF = 0;
    DEX = 1;
    ACC = 1;
    Avatar;
    look = 'InGamePicLx/ArravelLx.png';
}

class Bomber {
    ID = 4;
    name = "Взрывотехник";
    race = "undead";
    attack = "Timmate";
    HP = 14;
    maxHP = 14;
    MP = 0;
    maxMP = 0;
    ATK = 2;
    SPD = 7;
    DEF = 0;
    DEX = 1;
    ACC = 1;
    Avatar = 'AvatarsLx/Bomber.png';
    look = 'InGamePicLx/Minerva.png';
    ChoosenSkills = [Bombing];
    WeaponSkills = [];
    curLevel = 1;
    maxLevel = 1;
}

class Spider {
    ID = 5;
    name = "Паук";
    race = "insect";
    attack = "Timmate";
    HP = 9;
    maxHP = 9;
    MP = 0;
    maxMP = 0;
    ATK = 2;
    SPD = 6;
    DEF = 0;
    DEX = 1;
    ACC = 1;
    Avatar = 'AvatarsLx/Spider.png';
    look = 'InGamePicLx/Jetta.png';
    ChoosenSkills = [Bite];
    WeaponSkills = [];
    curLevel = 1;
    maxLevel = 1;
}

var CharacterList = [PlayerInfo, BatTemplate, Arravel, Bomber, Spider];
