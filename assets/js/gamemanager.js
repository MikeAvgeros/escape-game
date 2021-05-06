let roomIndex = 0;
let storyIndex = 0;

const images = {
    roomOne: "../assets/img/roomOne.jpg",
};

const storyNodes = {
    1: [
        {
            id: 0,
            text: "You wake up in a dark empty room tied firmly to a chair.",
            actions: [
                {
                    text: "Examine Room",
                    nextText: 1
                },
                {
                    text: "Break Free",
                    nextText: "You try to break free but the rope is too tight"
                }
            ]
        },
        {
            id: 1,
            text: "You notice some broken glass on the floor next to you.",
            actions: [
                {
                    text: "Take glass",
                    nextText: 2
                },
                {
                    text: "Do nothing",
                    nextText: "Doing nothing won't help you here. You need to escape"
                }
            ]
        },
        {
            id: 2,
            text: "Your body falls on the floor and your hand reaches the a broke glass shard",
            actions: [
                {
                    text: "Cut Rope",
                    nextText: 3
                },
                {
                    text: "Kill Yourself",
                    nextText: "You have died"
                }
            ]
        },
        {
            id: 3,
            text: "You manage to cut the rope and break free. You see a door to your right.",
            actions: [
                {
                    text: "Open Door",
                    nextText: "The door appears to be locked."
                },
                {
                    text: "Examine Room",
                    nextText: 4
                }
            ]
        },
        {
            id: 4,
            text: "You see a rusty key in the corner of the room.",
            actions: [
                {
                    text: "Use Key",
                    nextText: "You have successfully opened the door"
                    // play a happy melody and progress to room 2
                },
                {
                    text: "Smash Door",
                    nextText: "You try to smash the door but it doesn't work and you hurt yourself."
                    // reduce the life points from the player
                }
            ]
        }
    ]
};

const items = {
    roomOne: new Item("key", "description", "img"),
};

const lootItems = {
    roomOne: new Item("name", "description", "img"),
}

const enemies = {
    roomOne: new Enemy("enemyOne", "health", "attack", "defense", lootItems.roomOne),
};

const rooms = [
    roomOne = new Room(1, images.roomOne, storyNodes.roomOne, items.roomOne, enemies.roomOne),
];

function displayStoryNode(roomIndex, storyIndex) {
    currentRoom = rooms[roomIndex];
    currentRoom.displayName();
    currentRoom.displayImg();
    const textContainer = document.getElementById("room-description");
    textContainer.innerHTML = `<p>${storyNodes[currentRoom.id][storyIndex].text}</p>`;
    const buttons = document.getElementsByClassName("action-button");
    let actions = storyNodes[currentRoom.id][storyIndex].actions;
    for (let i=0; i<buttons.length; i++) {
        buttons[i].innerText = actions[i].text;
    }
}

function nextRoom() {
    roomIndex++;
}

function nextText() {
    storyIndex++;
}

displayStoryNode(roomIndex, storyIndex); 


