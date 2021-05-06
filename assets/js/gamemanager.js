const textContainer = document.getElementById("room-description");
const buttons = document.getElementsByClassName("action-button");
let roomIndex = 0;
let storyIndex = 0;

const images = {
    roomOne: "../img/roomOne.jpg",
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
                    text: "Use Key",
                    response: "You have successfully opened the door with the key"
                    // play a happy melody and progress to room 2
                },
                {
                    text: "Smash Door",
                    response: "You try to smash the door but it doesn't work and you hurt yourself."
                    // reduce the life points from the player
                }
            ]
        }
    ]
};

const items = {
    roomOne: new Item("key", "img"),
};

const lootItems = {
    roomOne: new Item("name", "img"),
}

const enemies = {
    roomOne: new Enemy("enemyOne", "health", "attack", "defense", lootItems.roomOne),
};

const rooms = [
    roomOne = new Room("Room One", 1, images.roomOne, storyNodes.roomOne, items.roomOne, enemies.roomOne),
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
    for (let i=0; i<buttons.length; i++) {
        buttons[i].innerText = actions[i].text;
        buttons[i].addEventListener("click", () => {
            storyNode.actions[i].hasOwnProperty("response") ? 
            textContainer.innerHTML = `<p>${storyNode.actions[i].response}</p>` : showStory(roomIndex, storyIndex);
        })
    }
}

function startGame() {
    showRoom(roomIndex);
    showStory(roomIndex, storyIndex); 
}

function nextRoom() {
    roomIndex++;
    showStory(roomIndex, storyIndex); 
}

startGame();