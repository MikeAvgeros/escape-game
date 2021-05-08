const textContainer = document.getElementById("room-description");
const buttons = document.getElementsByClassName("action-button");
const roomIndex = 0;
const storyIndex = 1;

const player = new Player("Mike", 100, 100, 100);

const items = {
    item1: new Item("key", "img"),
    item2: new Item("glass", "img")
};

const enemies = {
    robot: new Character("robot", 50, 40, 20)
}

const images = {
    room1: "../assets/img/graypaintedroom.jpg",
    room2: "../assets/img/skullroom.jpg",
};

const rooms = [
    room1 = new Room("Gray Room", images.room1, 1),
    room2 = new Room("Skull Room", images.room2, 2)
];

const storyNodes = getStoryNodes(player, items, enemies);

function getStoryNodes(player, items, enemies) {
    return {
        1: [
            {
                id: 1,
                text: `${player.name}, you wake up in a dark empty room tied firmly to a chair.`,
                actions: [
                    {
                        text: "Examine Room"
                    },
                    {
                        text: "Break Free",
                        response: "You try to break free but the rope is too tight"
                    }
                ]
            },
            {
                id: 2,
                text: `You notice a broken ${items.item2.name} on the floor next to you.`,
                actions: [
                    {
                        text: `Take ${items.item2.name}`
                    },
                    {
                        text: "Do nothing",
                        response: "Doing nothing won't help you here. You need to escape"
                    }
                ]
            },
            {
                id: 3,
                text: `Your body falls on the floor and your hand reaches the broken ${items.item2.name}`,
                actions: [
                    {
                        text: "Cut Rope"
                    },
                    {
                        text: "Kill Yourself",
                        response: "You can't kill yourself because you're tied up in the chair"
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
                        text: "Examine Room"
                    }
                ]
            },
            {
                id: 5,
                text:`You see a rusty ${items.item1.name} in the corner of the room.`,
                actions: [
                    {
                        text: `Use the ${items.item1.name}`
                    },
                    {
                        text: "Smash Door",
                        response: "You try to smash the door but it doesn't work and you hurt yourself."
                    }
                ]
            },
            {
                id: 6,
                text: "You have successfully opened the door!"
            }
        ],
        2: [
            {
                id: 1,
                text: "You see a dark room full of skulls",
                actions: [
                    {
                        text: "Examine Room"
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
                        text: "Examine Room"
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
    const currentRoom = rooms[roomIndex];
    currentRoom.showName();
    currentRoom.showImage();
}

function showStory(roomIndex, storyIndex) {
    const currentRoom = rooms[roomIndex];
    const storyNode = storyNodes[currentRoom.id].find(storyNode => storyNode.id === storyIndex);
    textContainer.innerHTML = `<p id="story-text">${storyNode.text}</p>`;
    const actions = storyNode.actions;
    if (storyIndex < storyNodes[currentRoom.id].length) {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = actions[i].text;
            buttons[i].addEventListener("click", () => {
                if (actions[i].hasOwnProperty("response")) {
                    textContainer.innerHTML = `<p id="story-text">${actions[i].response}</p>`;
                    return;
                }
                progressStory(roomIndex, storyIndex);
            });
            fadeButtons(i);
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

function fadeButtons(i) {
    buttons[i].classList.add("fade");
    setTimeout(() => {
        buttons[i].classList.remove("fade");
    }, 1000);
}

function progressStory(roomIndex, storyIndex) {
    storyIndex++;
    showStory(roomIndex, storyIndex);
}

function startGame() {
    showRoom(roomIndex);
    showStory(roomIndex, storyIndex); 
}

function nextRoom() {
    setTimeout(() => {
        roomIndex++;
        storyIndex = 0;
        showRoom(roomIndex);
        showStory(roomIndex, storyIndex); 
    }, 1500);
}

startGame();
