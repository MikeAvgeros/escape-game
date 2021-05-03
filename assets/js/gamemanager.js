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
    roomOne: [itemOne = new Item("name1.1", "description1.1", "img1.1"), itemTwo = new Item("name1.2", "description1.2", "img1.2")],
    roomTwo: [itemOne = new Item("name2.1", "description2.1", "img2.1"), itemTwo = new Item("name2.2", "description2.2", "img2.2")],
    roomThree: [itemOne = new Item("name3.1", "description3.1", "img3.1"), itemTwo = new Item("name3.2", "description3.2", "img3.2")],
    roomFour: [itemOne = new Item("name", "description", "img"), itemTwo = new Item("name", "description", "img")],
    roomFive: [itemOne = new Item("name", "description", "img"), itemTwo = new Item("name", "description", "img")],
    roomSix: [itemOne = new Item("name", "description", "img"), itemTwo = new Item("name", "description", "img")],
    roomSeven: [itemOne = new Item("name", "description", "img"), itemTwo = new Item("name", "description", "img")],
    roomEight: [itemOne = new Item("name", "description", "img"), itemTwo = new Item("name", "description", "img")]
};

const enemies = {
    roomOne: new Enemy("enemyOne", "health", "attack", "defense", items.roomOne[1]),
    roomTwo: new Enemy("enemyTwo", "health", "attack", "defense", items.roomTwo[1]),
    roomThree: new Enemy("enemyThree", "health", "attack", "defense", items.roomThree[1]),
    roomFour: new Enemy("enemyFour", "health", "attack", "defense", items.roomFour[1]),
    roomFive: new Enemy("name", "health", "attack", "defense", items.roomFive[1]),
    roomSix: new Enemy("name", "health", "attack", "defense", items.roomSix[1]),
    roomSeven: new Enemy("name", "health", "attack", "defense", items.roomSeven[1]),
    roomEight: new Enemy("name", "health", "attack", "defense", items.roomEight[1])
};

const rooms = [
    roomOne = new Room(names.roomOne, descriptions.roomOne, images.roomOne, items.roomOne[0], enemies.roomOne),
    roomTwo = new Room(names.roomTwo, descriptions.roomTwo, images.roomTwo, items.roomTwo[0], enemies.roomTwo),
    roomThree = new Room(names.roomThree, descriptions.roomThree, images.roomThree, items.roomThree[0], enemies.roomThree),
    roomFour = new Room(names.roomFour, descriptions.roomFour, images.roomFour, items.roomFour[0], enemies.roomThree),
    roomFive = new Room(names.roomFive, descriptions.roomFive, images.roomFive, items.roomFive[0], enemies.roomFour),
    roomSix = new Room(names.roomSix, descriptions.roomSix, images.roomSix, items.roomSix[0], enemies.roomSix),
    roomSeven = new Room(names.roomSeven, descriptions.roomSeven, images.roomSeven, items.roomSeven[0], enemies.roomSeven),
    roomEight = new Room(names.roomEight, descriptions.roomEight, images.roomEight, items.roomEight[0], enemies.roomEight)
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
