class BatTemplate {
    name = "Летучая мышь";
    race = "Зверь";
    attack = "Enemy";
    HP = 40;
    maxHP = 40;
    ATK = 4;
    SPD = 5;
    Avatar = 'AvatarsLx/BatLx.png';
    look = 'InGamePicLx/ArravelLx.png';
    
    Start() {
        setTimeout( () => {
            Max = TimmateArr.length - 1;
            RandomNumber(Min, Max);
            LightAttacked(TimmateArr[rand]);
            StandartAttack(TimmateArr[rand], this);
            BattleCycle();
        }, 100);
    };
}

class PlayerInfo {
    name = "Player";
    race = "Human";
    attack = "Timmate";
    HP = 80;
    maxHP = 80;
    ATK = 5;
    SPD = 9;
    Avatar = 'AvatarsLx/ArteonLx.png';
    look = 'InGamePicLx/Minerva.png';
    OpenedHeroes = [this];
    
    Start() {
        setTimeout( () => {
            Max = EnemyArr.length - 1;
            RandomNumber(Min, Max);
            LightAttacked(EnemyArr[rand]);
            StandartAttack(EnemyArr[rand], this);
            BattleCycle();
        }, 100);
    };
}


//ОСТАЛЬНОЕ НЕ ИСПОЛЬЗУЕТСЯ ПОКА ЧТО
//ТРЕБУЕТСЯ ОПТИМИЗАЦИЯ

class Bomber {
    name = "Взрывотехник";
    race = "undead";
    attack = "Timmate";
    HP = 70;
    maxHP = 70;
    ATK = 20;
    SPD = 7;
    DMGM = 2;
    Avatar = '';
    
    Start() {
        setTimeout( () => {
            Bombing(EnemyArr, this);
            BattleCycle();
        }, 2000);
    };
}

class Spider {
    name = "Паук";
    race = "insect";
    attack = "Enemy";
    HP = 60;
    maxHP = 60;
    ATK = 5;
    SPD = 6;
    DMGM = 2;
    Avatar = 'AvatarsLx/ArteonLx.png';
    
    Start() {
        setTimeout
    }
}