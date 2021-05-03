class Character {
    constructor(name, health, attack, defense) {
        this.name = name;
        this.maxhealth = health;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.isDead = false;
    }
    takeDamage(amount) {
        let damage = amount - this.defens;
        if (damage < 0) {
            damage = 0;
        }
        console.log(this.name + " took " + damage + " damage");
        this.health -= damage;
        console.log(this.health);
    }
    checkIsDead() {
        if (this.health <= 0) {
            this.isDead = true;
        }
    }
}

class Enemy extends Character {
    constructor(name, health, attack, defense, itemdrop) {
        super(name, health, attack, defense);
        this.itemdrop = itemdrop;
    }
    lootEnemy() {
        // when enemy dies check if any items drop
    }
    clearEnemy() {
        // when enemy dies remove enemy from the list of enemies in the room
    }
}

class Player extends Character {
    constructor(name, health, attack, defense) {
        super(name, health, attack, defense);
    }
    handleDeath() {
        // game ends 
    }
    handleWeapon() {
        // update the stats based on the weapon function
    }
}
