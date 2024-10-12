class ItemBase {
    #name;
    #ID;
    #rarity;
    #avatar;
    #type;

    constructor(name, ID, rarity, avatar, type) {
        this.#name = name;
        this.#ID = ID;
        this.#rarity = rarity;
        this.#avatar = avatar;
        this.#type = type;
    }

    getName() {
        return this.#name;
    }

    getID() {
        return this.#ID;
    }

    getRarity() {
        return this.#rarity;
    }

    getAvatar() {
        return this.#avatar;
    }

    getType() {
        return this.#type;
    }
}

class EquipmentBase extends ItemBase {
    #slot;
    #skills = [];
    #buffs = {
        "ATK": 0,
        "SPD": 0,
        "DEF": 0,
        "DEX": 0,
        "ACC": 0
    };
    #physique;

    getSlot() {
        return this.#slot;
    }

    setSlot(slot) {
        this.#slot = slot;
    }

    getSkills() {
        return this.#skills;
    }

    setSkills(skills) {
        skills.forEach((skill) => this.#skills.push(skill));
    }

    getBuffs() {
        return this.#buffs;
    }

    setBuffs(buffs) {
        for (this.i = 0; this.i < Object.keys(buffs).length; this.i++) {
            this.#buffs[Object.keys(buffs)[this.i]] = buffs[Object.keys(buffs)[this.i]];
        }
    }

    getPhysique() {
        return this.#physique;
    }

    setPhysique(newPhysique) {
        this.#physique = newPhysique;
    }
}

class ShardBase extends ItemBase {
    #needfulCountForActivation;
    #thatHeroID;

    getNeedfulCountForActivation() {
        return this.#needfulCountForActivation;
    }

    setNeedfulCountForActivation(count) {
        this.#needfulCountForActivation = count;
    }

    getThatHeroID() {
        return this.#thatHeroID;
    }

    setThatHeroID(heroID) {
        this.#thatHeroID = heroID;
    }
}

const itemsAndTypes = {
    "oaklog": "resource",
    "bone": "resource",
    "hide": "resource",
    "batShards": "shards",
    "spiderShards": "shards",
    "bomberShards": "shards",
    "lizardmanShards": "shards",
    "trainingSword": "equipment"
}