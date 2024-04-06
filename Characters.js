class BatTemplate {
    name = "Летучая мышь";
    race = "beast";
    attack = "Enemy";
    HP = 10;
    maxHP = 10;
    ATK = 1;
    SPD = 5;
    DEF = 0;
    Avatar = 'AvatarsLx/BatLx.png';
    look = 'InGamePicLx/Jetta.png';
    ChoosenSkills = [];
    WeaponSkills = [];
    loot = [ [new TrainingSword, 1, 60], [new TwoHandedSword, 1, 60] ];
}

class PlayerInfo {
    name = "Player";
    race = "human";
    attack = "Timmate";
    HP = 18;
    maxHP = 18;
    ATK = 2;
    SPD = 7;
    DEF = 0;
    Avatar = 'AvatarsLx/ArteonLx.png';
    look = 'InGamePicLx/Bono.png';
    OpenedHeroes = [this, new Bomber, new Spider];
    ChoosenSkills = [];
    WeaponSkills = [];
    equipmentSlots = [ ['weapon'], ['head'], ];
}

class Arravel {
    name = "Арравел";
    race = "beast";
    attack = "Timmate";
    HP;
    maxHP;
    ATK;
    SPD;
    DEF = 0;
    Avatar;
    look = 'InGamePicLx/ArravelLx.png';
}

class Bomber {
    name = "Взрывотехник";
    race = "undead";
    attack = "Timmate";
    HP = 17;
    maxHP = 17;
    ATK = 2;
    SPD = 7;
    DEF = 0;
    Avatar = '';
    ChoosenSkills = [Bombing];
    WeaponSkills = [];
}

class Spider {
    name = "Паук";
    race = "insect";
    attack = "Timmate";
    HP = 15;
    maxHP = 15;
    ATK = 2;
    SPD = 6;
    DEF = 0;
    Avatar = 'AvatarsLx/ArteonLx.png';
    ChoosenSkills = [Bite];
    WeaponSkills = [];
}