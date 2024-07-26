class PlayerClass {
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
    OpenedHeroes = [this];
    ChoosenSkills = [3];
    WeaponSkills = [];
    equipmentSlots = [ ['majorHand'], ['minorHand'], ['head'], ];
}

class BatClass {
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
    curLevel = 1;
    maxLevel = 3;
    levelUp = [ ['hp', 2], ['atk', 1], ['dex', 1], ['spd', 1], ['skills', 1], ];
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
    ChoosenSkills = [0];
    WeaponSkills = [];
    curLevel = 1;
    maxLevel = 3;
    levelUp = [ ['hp', 2], ['atk', 1], ['dex', 1], ['spd', 1], ];
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
    ChoosenSkills = [1];
    WeaponSkills = [];
    curLevel = 1;
    maxLevel = 3;
    levelUp = [ ['hp', 2], ['atk', 1], ['dex', 1], ['spd', 1], ];
}

var CharacterList = [PlayerClass, BatClass, Arravel, Bomber, Spider];