/* jshint esversion: 8 */

class Item {
    constructor(name) {
        this.name = name;
    }
}

class Weapon extends Item {
    constructor(name, health, attack, defense) {
        super(name);
        this.health = health;
        this.attack = attack;
        this.defense = defense;
    }
    updateStats(player) {
        player.health += this.health;
        player.attack += this.attack;
        player.defense += this.defense;
    }
}
