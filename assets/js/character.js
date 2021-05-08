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
        let damage = amount - this.defense;
        if (damage < 0) {
            damage = 0;
        }
        this.health -= damage;
    }
    checkIsDead() {
        if (this.health <= 0) {
            this.isDead = true;
        }
    }
}

class Player extends Character {
    constructor(name, health, attack, defense, takeDamage) {
        super(name, health, attack, defense, takeDamage);
    }
    handleDeath() {
        // game ends 
    }
    handleWeapon() {
        // update the stats based on the weapon function
    }
}
