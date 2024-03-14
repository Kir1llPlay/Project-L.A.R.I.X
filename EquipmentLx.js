class Bokken {
    name = 'Боккэн';
    rarity = 'standart';
    slot = 'weapon';
    isEquiped = false;
    ATK = 4;
    Avatar = '';
    
    Equip(user) {
        if (isEquiped) user.ATK += this.ATK;
    }
}

class Broadsword {
    name = 'Палаш';
    rarity = 'rare';
    slot = 'weapon';
    ATK = 14;
    Avatar = '';
}

class Bow {
    name = 'Лук';
    rarity = 'rare';
    slot = 'weapon';
    ATK = 15;
    Avatar = '';
}

class Arquebus {
    name = 'Аркебуза';
    rarity = 'rare';
    slot = 'weapon';
    ATK = 20;
    Avatar = '';
}

class TwoHandedMagicSword {
    name = 'Двуручный магический меч';
    rarity = 'epic';
    slot = 'weapon';
    ATK = 25;
    Avatar = '';
}

class DuskAx {
    name = 'Секира сумрака';
    rarity = 'legend';
    slot = 'weapon';
    ATK = 117;
    Avatar = '';
    
    eclipse(character, user) {
        return character.HP -= (this.ATK + user.ATK) * 7;
    }
}

class RapierOfTheSun {
    name = 'Рапира солнца';
    rarity = 'legend';
    slot = 'weapon';
    ATK = 98;
    Avatar = '';
    
    dawn(character, user) {
        return character.HP -= (this.ATK + user.ATK) * 8;
    }
}

class DispencerOfJustice {
    name = 'Вершитель правосудия';
    rarity = 'myth';
    slot = 'weapon';
    ATK = 525;
    Avatar = '';
    
    method(character, user) {
        return character.HP -=;
    }
}