const textContainer = document.getElementById("room-description");
const buttons = document.getElementsByClassName("action-button");

let roomIndex = 0;
let storyIndex = 0;

const player = new Player("Mike", 100, 100, 100);

const items = {
    key: new Item("key", "img"),
    glass: new Item("glass", "img")
};

const enemies = {
    robot: new Character("robot", 50, 40, 20)
}

const images = {
    roomOne: "../assets/img/graypaintedroom.jpg",
    roomTwo: "../assets/img/skullroom.jpg",
};

const rooms = [
    roomOne = new Room("Gray Room", images.roomOne, 1),
    roomTwo = new Room("Skull Room", images.roomTwo, 2)
];

const storyNodes = getStoryNodes(player, items, enemies);

function getStoryNodes(player, items, enemies) {
    return {
        1: [
            {
                id: 1,
                text:  `${player.name}, you wake up in a dark empty room tied firmly to a chair.`,
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
                text: `You notice a broken ${items.glass.name} on the floor next to you.`,
                actions: [
                    {
                        text: `Take ${items.glass.name}`,
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
                        response: "You can't kill yourself tied up in the chair"
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
                    }
                ]
            },
            {
                id: 6,
                text: "You have successfully opened the door with the key"
            }
        ],
        2: [
            {
                id: 1,
                text: "You see a dark room full of skulls",
                actions: [
                    {
                        text: "Examine Room",
                    },
                    {
                        text: "Go Back",
                        response: `The door behind you closes and a ${enemies.robot.name} appears in front of you`
                    }
                ]
            },
            {
                id: 2,
                text: "You see a dark room full of skulls",
                actions: [
                    {
                        text: "Examine Room",
                    },
                    {
                        text: "Go Back",
                        response: `The door behind you closes and a ${enemies.robot.name} appears in front of you`
                    }
                ]
            }
        ],
    }
};

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
    else if (storyIndex == storyNodes[currentRoom.id].length) {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = "";
        }
        nextRoom();
    }
    else {
        alert("Error!!!");
    }
}

function startGame() {
    showRoom(roomIndex);
    showStory(roomIndex, storyIndex); 
}

function nextRoom() {
    setTimeout(function() {
        roomIndex++;
        storyIndex = 0;
        showRoom(roomIndex);
        showStory(roomIndex, storyIndex); 
    }, 1500);
}

startGame();
