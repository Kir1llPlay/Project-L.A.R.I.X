class Broadsword {
    name = 'Палаш';
    rarity = 'rare';
    slot = 'majorHand';
    ATK = 14;
    Avatar = '';
}

class Bow {
    name = 'Лук';
    rarity = 'rare';
    slot = 'majorHand';
    ATK = 15;
    Avatar = '';
}

class Arquebus {
    name = 'Аркебуза';
    rarity = 'rare';
    slot = 'majorHand';
    ATK = 20;
    Avatar = '';
}

class TwoHandedSword {
    name = 'Двуручный меч';
    rarity = 'epic';
    slot = 'majorHand';
    isEquiped = false;
    ATK = 25;
    Avatar = 'EquipmentAvatars/TwoHandedMagicSword.png';
    OpenedSkills = [2];
}

class DuskAx {
    name = 'Секира сумрака';
    rarity = 'legend';
    slot = 'weapon';
    isEquiped = false;
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
        return character.HP -= this.ATK;
    }
}