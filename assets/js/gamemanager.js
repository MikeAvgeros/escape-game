const textContainer = document.getElementById("room-description");
const buttons = document.getElementsByClassName("action-button");
let roomIndex = 0;
let storyIndex = 0;

const images = {
    roomOne: "../escape-game/assets/img/graypaintedroom.jpg",
    roomTwo: "../escape-game/assets/img/skullroom.jpg",
};

const storyNodes = {
    1: [
        {
            id: 1,
            text: "You wake up in a dark empty room tied firmly to a chair.",
            actions: [
                {
                    text: "Examine Room",
                },
                {
                    text: "Break Free",
                    response: "You try to break free but the rope is too tight"
                }
            ]
        },
        {
            id: 2,
            text: "You notice some broken glass on the floor next to you.",
            actions: [
                {
                    text: "Take glass",
                },
                {
                    text: "Do nothing",
                    response: "Doing nothing won't help you here. You need to escape"
                }
            ]
        },
        {
            id: 3,
            text: "Your body falls on the floor and your hand reaches the broken glass",
            actions: [
                {
                    text: "Cut Rope",
                },
                {
                    text: "Kill Yourself",
                    response: "You have died"
                }
            ]
        },
        {
            id: 4,
            text: "You manage to cut the rope and break free. You see a door to your right.",
            actions: [
                {
                    text: "Open Door",
                    response: "The door appears to be locked."
                },
                {
                    text: "Examine Room",
                }
            ]
        },
        {
            id: 5,
            text: "You see a rusty key in the corner of the room.",
            actions: [
                {
                    text: "Use Key"
                },
                {
                    text: "Smash Door",
                    response: "You try to smash the door but it doesn't work and you hurt yourself."
                    // reduce the life points from the player
                }
            ]
        },
        {
            id: 6,
            text: "You have successfully opened the door with the key",
            actions: [
                {
                    text: ""
                },
                {
                    text: ""
                }
            ]
        }
    ],
    2: [
        {
            id: 1,
            text: "You see a room full of skulls",
            actions: [
                {
                    text: "Examine Room",
                },
                {
                    text: "Go Back",
                    response: "The door behind you closes"
                }
            ]
        },
        {
            id: 2,
            text: "You notice some broken glass on the floor next to you.",
            actions: [
                {
                    text: "Take glass",
                },
                {
                    text: "Do nothing",
                    response: "Doing nothing won't help you here. You need to escape"
                }
            ]
        },
        {
            id: 3,
            text: "Your body falls on the floor and your hand reaches the broken glass",
            actions: [
                {
                    text: "Cut Rope",
                },
                {
                    text: "Kill Yourself",
                    response: "You have died"
                }
            ]
        },
        {
            id: 4,
            text: "You manage to cut the rope and break free. You see a door to your right.",
            actions: [
                {
                    text: "Open Door",
                    response: "The door appears to be locked."
                },
                {
                    text: "Examine Room",
                }
            ]
        },
        {
            id: 5,
            text: "You see a rusty key in the corner of the room.",
            actions: [
                {
                    text: "Use Key"
                },
                {
                    text: "Smash Door",
                    response: "You try to smash the door but it doesn't work and you hurt yourself."
                    // reduce the life points from the player
                }
            ]
        },
        {
            id: 6,
            text: "You have successfully opened the door with the key",
            actions: [
                {
                    text: ""
                },
                {
                    text: ""
                }
            ]
        }
    ]
};

const items = {
    roomOne: new Item("key", "img"),
    roomTwo: new Item("sword", "img")
};

const lootItems = {
    roomOne: new Item("name", "img"),
    roomTwo: new Item("name", "img")
}

const enemies = {
    roomOne: new Enemy("enemyOne", "health", "attack", "defense", lootItems.roomOne),
    roomTwo: new Enemy("enemyOne", "health", "attack", "defense", lootItems.roomOne)
};

const rooms = [
    roomOne = new Room("Gray Room", 1, images.roomOne, storyNodes.roomOne, items.roomOne, enemies.roomOne),
    roomTwo = new Room("Skull Room", 2, images.roomTwo, storyNodes.roomTwo, items.roomTwo, enemies.roomTwo)
];

function showRoom(roomIndex) {
    currentRoom = rooms[roomIndex];
    currentRoom.showName();
    currentRoom.showImage();
}

function showStory(roomIndex, storyIndex) {
    storyIndex++;
    currentRoom = rooms[roomIndex];
    const storyNode = storyNodes[currentRoom.id].find(storyNode => storyNode.id === storyIndex);
    textContainer.innerHTML = `<p>${storyNode.text}</p>`;
    const actions = storyNode.actions;
    if (storyIndex < storyNodes[currentRoom.id].length) {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = actions[i].text;
            buttons[i].addEventListener("click", () => {
                if (storyNode.actions[i].hasOwnProperty("response")) {
                    textContainer.innerHTML = `<p>${storyNode.actions[i].response}</p>` 
                }
                else {
                    showStory(roomIndex, storyIndex);
                }
            });
        }
    }
    else {
        nextRoom();
    }
}

function startGame() {
    showRoom(roomIndex);
    showStory(roomIndex, storyIndex); 
}

function nextRoom() {
    setTimeout(function() {
        console.log("called");
        roomIndex++;
        storyIndex = 0;
        showRoom(roomIndex);
        showStory(roomIndex, storyIndex); 
    }, 1000);
}

startGame();
