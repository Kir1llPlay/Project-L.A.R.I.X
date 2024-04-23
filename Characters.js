class BatTemplate {
    name = "Летучая мышь";
    race = "beast";
    attack = "Enemy";
    HP = 100;
    maxHP = 100;
    MP = 0;
    maxMP = 0;
    ATK = 1;
    SPD = 5;
    DEF = 0;
    DEX = 1;
    ACC = 1;
    Avatar = 'AvatarsLx/BatLx.png';
    look = 'InGamePicLx/Jetta.png';
    ChoosenSkills = [];
    WeaponSkills = [];
    loot = [ [new Hide, 1, 30], [new TwoHandedSword, 1, 60], [new Bone, 1, 50], [new BatShards, 1, 90] ];
}

class PlayerInfo {
    name = "Player";
    race = "human";
    attack = "Timmate";
    HP = 18;
    maxHP = 18;
    MP = 10;
    maxMP = 10;
    ATK = 2;
    SPD = 7;
    DEF = 1;
    DEX = 1;
    ACC = 1;
    Avatar = 'AvatarsLx/ArteonLx.png';
    look = 'InGamePicLx/Maat.png';
    OpenedHeroes = [this, new Bomber, new Spider];
    ChoosenSkills = [MagicAttack];
    WeaponSkills = [];
    equipmentSlots = [ ['weapon'], ['head'], ];
}

class Arravel {
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
    name = "Взрывотехник";
    race = "undead";
    attack = "Timmate";
    HP = 17;
    maxHP = 17;
    MP = 0;
    maxMP = 0;
    ATK = 2;
    SPD = 7;
    DEF = 0;
    DEX = 1;
    ACC = 1;
    Avatar = 'AvatarsLx/Bomber.png';
    ChoosenSkills = [Bombing];
    WeaponSkills = [];
}

class Spider {
    name = "Паук";
    race = "insect";
    attack = "Timmate";
    HP = 15;
    maxHP = 15;
    MP = 0;
    maxMP = 0;
    ATK = 2;
    SPD = 6;
    DEF = 0;
    DEX = 1;
    ACC = 1;
    Avatar = 'AvatarsLx/Spider.png';
    ChoosenSkills = [Bite];
    WeaponSkills = [];
}