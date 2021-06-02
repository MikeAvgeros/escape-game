/* jshint esversion: 8 */

class Item {
    constructor(name, img) {
        this.name = name;
        this.img = img;
    }
}

class Weapon extends Item {
    constructor(name, img, attack, defense) {
        super(name, img);
        this.attack = attack;
        this.defense = defense;
    }
    updateStats(player) {
        player.attack += this.attack;
        player.defense += this.defense;
    }
}
