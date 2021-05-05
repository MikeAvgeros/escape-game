let roomIndex = 0;
let storyIndex = 0;

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
    roomOne: "You wake up in a dark empty room tied firmly tied to a chair."
}

const storylines = {
    roomOne: [
            [
                "You notice some broken glass on the floor next to you.", 
                "You manage to cut the rope and break free. You see a door to your right.",
                "You see some keys hidden behind the desk."
            ],
            [
                "You try to break free but the rope is too tight",
                "Doing nothing won't help you now",
                "You try to exit the room but the door is locked.",
                "You try to break the door but it's not possible."
            ]
        ]
};

const action = {
    correct: 0,
    wrong: 1
}

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
    roomOne: new Item("name", "description", "img"),
    roomTwo: new Item("name", "description", "img"),
    roomThree: new Item("name", "description", "img"),
    roomFour: new Item("name", "description", "img"), 
    roomFive: new Item("name", "description", "img"), 
    roomSix: new Item("name", "description", "img"), 
    roomSeven: new Item("name", "description", "img"), 
    roomEight: new Item("name", "description", "img")
};

const lootItems = {
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
    roomOne: new Enemy("enemyOne", "health", "attack", "defense", lootItems.roomOne),
    roomTwo: new Enemy("enemyTwo", "health", "attack", "defense", lootItems.roomTwo),
    roomThree: new Enemy("enemyThree", "health", "attack", "defense", lootItems.roomThree),
    roomFour: new Enemy("enemyFour", "health", "attack", "defense", lootItems.roomFour),
    roomFive: new Enemy("name", "health", "attack", "defense", lootItems.roomFive),
    roomSix: new Enemy("name", "health", "attack", "defense", lootItems.roomSix),
    roomSeven: new Enemy("name", "health", "attack", "defense", lootItems.roomSeven),
    roomEight: new Enemy("name", "health", "attack", "defense", lootItems.roomEight)
};

const rooms = [
    roomOne = new Room(names.roomOne, descriptions.roomOne, storylines.roomOne, images.roomOne, items.roomOne, enemies.roomOne),
    roomTwo = new Room(names.roomTwo, descriptions.roomOne, storylines.roomTwo, images.roomTwo, items.roomTwo, enemies.roomTwo),
    roomThree = new Room(names.roomThree, descriptions.roomOne, storylines.roomThree, images.roomThree, items.roomThree, enemies.roomThree),
    roomFour = new Room(names.roomFour, descriptions.roomOne, storylines.roomFour, images.roomFour, items.roomFour, enemies.roomThree),
    roomFive = new Room(names.roomFive, descriptions.roomOne, storylines.roomFive, images.roomFive, items.roomFive, enemies.roomFour),
    roomSix = new Room(names.roomSix, descriptions.roomOne, storylines.roomSix, images.roomSix, items.roomSix, enemies.roomSix),
    roomSeven = new Room(names.roomSeven, descriptions.roomOne, storylines.roomSeven, images.roomSeven, items.roomSeven, enemies.roomSeven),
    roomEight = new Room(names.roomEight, descriptions.roomOne, storylines.roomEight, images.roomEight, items.roomEight, enemies.roomEight)
];

function displayCurrentRoom(roomIndex) {
    currentRoom = rooms[roomIndex];
    currentRoom.displayName();
    currentRoom.displayDescription();
    currentRoom.displayImg();
}

function displayCurrentStory(roomIndex, action, storyIndex) {
    currentRoom = rooms[roomIndex];
    currentRoom.displayStory(action, storyIndex);
}

function progressRoom() {
    roomIndex++;
}

displayCurrentRoom(roomIndex);

//displayCurrentStory(roomIndex, action.correct, storyIndex);

