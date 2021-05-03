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
    roomOne = new Room("room one", "this is room one", "../images/roomOne.jpg", items.roomOne[0], enemies.roomOne),
    roomTwo = new Room("room two", "this is room twp", "../images/roomTwo.jpg", items.roomTwo[0], enemies.roomTwo),
    roomThree = new Room("room three", "this is room three", "../images/roomThree.jpg", items.roomThree[0], enemies.roomThree),
    roomFour = new Room("room four", "this is room four", "../images/roomFour.jpg", items.roomFour[0], enemies.roomThree),
    roomFive = new Room("room five", "this is room five", "../images/roomFive.jpg", items.roomFive[0], enemies.roomFour),
    roomSix = new Room("room six", "this is room six", "../images/roomSix.jpg", items.roomSix[0], enemies.roomSix),
    roomSeven = new Room("room seven", "this is room seven", "../images/roomSeven.jpg", items.roomSeven[0], enemies.roomSeven),
    roomEight = new Room("room eight", "this is room eight", "../images/roomEight.jpg", items.roomEight[0], enemies.roomEight)
];

rooms[0].displayName();
rooms[0].displayImg();
