class BatTemplate {
    name = "Летучая мышь";
    race = "Зверь";
    attack = "Enemy";
    HP = 10;
    maxHP = 10;
    ATK = 1;
    SPD = 5;
    DEF = 0;
    Avatar = 'AvatarsLx/BatLx.png';
    look = 'InGamePicLx/ArravelLx.png';
    OpenedSkills = [];
}

class PlayerInfo {
    name = "Player";
    race = "Human";
    attack = "Timmate";
    HP = 18;
    maxHP = 18;
    ATK = 2;
    SPD = 7;
    DEF = 0;
    Avatar = 'AvatarsLx/ArteonLx.png';
    look = 'InGamePicLx/Minerva.png';
    OpenedHeroes = [this, new Bomber, new Spider];
    OpenedSkills = [];
}

class Arravel {
    name = "Арравел";
    race = "Зверь";
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
    OpenedSkills = [Bombing];
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
    OpenedSkills = [Bite];
}