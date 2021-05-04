let roomIndex = 0;

const names = {
    roomOne: "Room 1",
    roomTwo: "Room 2",
    roomThree: "Room 3",
    roomFour: "Room 4",
    roomFive: "Room 5",
    roomSix: "Room 6",
    roomSeven: "Room 7",
    roomEight: "Room 8"
};

const descriptions = {
    roomOne: "Room 1 description",
    roomTwo: "Room 2 description",
    roomThree: "Room 3 description",
    roomFour: "Room 4 description",
    roomFive: "Room 5 description",
    roomSix: "Room 6 description",
    roomSeven: "Room 7 description",
    roomEight: "Room 8 description"
};

const images = {
    roomOne: "../assets/img/roomOne.jpg",
    roomTwo: "../assets/img/roomTwo.jpg",
    roomThree: "../assets/img/roomThree.jpg",
    roomFour: "../assets/img/roomFour.jpg",
    roomFive: "../assets/img/roomFive.jpg",
    roomSix: "../assets/img/roomSix.jpg",
    roomSeven: "../assets/img/roomSeven.jpg",
    roomEight: "../assets/img/roomEight.jpg"
};

const items = {
    roomOne: [itemOne = new Item("name", "description", "img"), itemTwo = new Item("name", "description", "img")],
    roomTwo: [itemOne = new Item("name", "description", "img"), itemTwo = new Item("name", "description", "img")],
    roomThree: [itemOne = new Item("name", "description", "img"), itemTwo = new Item("name", "description", "img")],
    roomFour: [itemOne = new Item("name", "description", "img"), itemTwo = new Item("name", "description", "img")],
    roomFive: [itemOne = new Item("name", "description", "img"), itemTwo = new Item("name", "description", "img")],
    roomSix: [itemOne = new Item("name", "description", "img"), itemTwo = new Item("name", "description", "img")],
    roomSeven: [itemOne = new Item("name", "description", "img"), itemTwo = new Item("name", "description", "img")],
    roomEight: [itemOne = new Item("name", "description", "img"), itemTwo = new Item("name", "description", "img")]
};

const lootItem = {
    roomOne: new Item("name", "description", "img"),
    roomTwo: new Item("name", "description", "img"),
    roomThree: new Item("name", "description", "img"),
    roomFour: new Item("name", "description", "img"), 
    roomFive: new Item("name", "description", "img"), 
    roomSix: new Item("name", "description", "img"), 
    roomSeven: new Item("name", "description", "img"), 
    roomEight: new Item("name", "description", "img")
}

const enemies = {
    roomOne: new Enemy("enemyOne", "health", "attack", "defense", lootItem.roomOne),
    roomTwo: new Enemy("enemyTwo", "health", "attack", "defense", lootItem.roomTwo),
    roomThree: new Enemy("enemyThree", "health", "attack", "defense", lootItem.roomThree),
    roomFour: new Enemy("enemyFour", "health", "attack", "defense", lootItem.roomFour),
    roomFive: new Enemy("name", "health", "attack", "defense", lootItem.roomFive),
    roomSix: new Enemy("name", "health", "attack", "defense", lootItem.roomSix),
    roomSeven: new Enemy("name", "health", "attack", "defense", lootItem.roomSeven),
    roomEight: new Enemy("name", "health", "attack", "defense", lootItem.roomEight)
};

const rooms = [
    roomOne = new Room(names.roomOne, descriptions.roomOne, images.roomOne, items.roomOne, enemies.roomOne),
    roomTwo = new Room(names.roomTwo, descriptions.roomTwo, images.roomTwo, items.roomTwo, enemies.roomTwo),
    roomThree = new Room(names.roomThree, descriptions.roomThree, images.roomThree, items.roomThree, enemies.roomThree),
    roomFour = new Room(names.roomFour, descriptions.roomFour, images.roomFour, items.roomFour, enemies.roomThree),
    roomFive = new Room(names.roomFive, descriptions.roomFive, images.roomFive, items.roomFive, enemies.roomFour),
    roomSix = new Room(names.roomSix, descriptions.roomSix, images.roomSix, items.roomSix, enemies.roomSix),
    roomSeven = new Room(names.roomSeven, descriptions.roomSeven, images.roomSeven, items.roomSeven, enemies.roomSeven),
    roomEight = new Room(names.roomEight, descriptions.roomEight, images.roomEight, items.roomEight, enemies.roomEight)
];

function displayCurrentRoom(index) {
    currentRoom = rooms[index];
    currentRoom.displayName();
    currentRoom.displayDescription();
    currentRoom.displayImg();
}

function progressRoom() {
    roomIndex++;
}

displayCurrentRoom(roomIndex);
