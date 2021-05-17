const textContainer = document.getElementById("room-description");
const paragraph = document.createElement("p");
const buttons = document.getElementsByClassName("action-button");
const roomImage = document.getElementById("room-img");
const roomName = document.getElementById("room-name");

let roomId;
let storyId;
let currentRoom;
let currentStory;
let actions;
let finishedTyping;
let typeWriter;

const player = new Player("Mike", 100, 50, 30);

const itemImg = {
    item2: "./assets/img/skullroom.jpg"
}

const items = {
    item1: new Item("key", "img"),
    item2: new Item("glass", itemImg.item2)
};

const enemies = {
    robot: new Character("robot", 50, 40, 20)
};

const roomImg = {
    GrayRoom: "./assets/img/graypaintedroom.jpg",
    SkullRoom: "./assets/img/skullroom.jpg"
};

const rooms = {
    GrayRoom: new Room("Gray Room", roomImg.GrayRoom, "GrayRoom"),
    SkullRoom: new Room("Skull Room", roomImg.SkullRoom, "SkullRoom")
};
    

const story = {
    GrayRoom: [
        {
            id: 1,
            text: `${player.name}, you wake up in a dark empty room tied to a chair.`,
            actions: [
                {
                    text: "Examine Room",
                    destination: 2
                },
                {
                    text: "Break Free",
                    destination: 2
                }
            ]
        },
        {
            id: 2,
            text: `You notice a broken ${items.item2.name} on the floor next to you.`,
            actions: [
                {
                    text: `Take ${items.item2.name}`,
                    destination: 3
                    
                },
                {
                    text: "Do nothing",
                    destination: 3
                }
            ]
        },
        {
            id: 3,
            text: `Your body falls on the floor and your hand reaches the broken ${items.item2.name}.`,
            actions: [
                {
                    text: "Cut Rope",
                    destination: 4
                },
                {
                    text: "Kill Yourself",
                    destination: 4
                }
            ]
        },
        {
            id: 4,
            text: "You manage to cut the rope and break free. You see a door to your right.",
            actions: [
                {
                    text: "Open Door",
                    destination: 5
                },
                {
                    text: "Examine Room",
                    destination: 5
                }
            ]
        },
        {
            id: 5,
            text:`You see a rusty ${items.item1.name} in the corner of the room.`,
            actions: [
                {
                    text: `Use the ${items.item1.name}`,
                    destination: 6
                },
                {
                    text: "Smash Door",
                    destination: 6
                }
            ]
        },
        {
            id: 6,
            text: "You have successfully opened the door!",
            actions: [
                {
                    text: `Exit Room`,
                    exit: rooms.SkullRoom.id
                },
                {
                    text: "Stay Here",
                    exit: rooms.SkullRoom.id
                }
            ]
        }
    ],
    SkullRoom: [
        {
            id: 1,
            text: "You see a dark room full of skulls.",
            actions: [
                {
                    text: "Examine Room",
                    destination: 2
                },
                {
                    text: "Go Back",
                    destination: 2
                }
            ]
        },
        {
            id: 2,
            text: "You see a dark room full of skulls",
            actions: [
                {
                    text: "Attack",
                    destination: 3
                },
                {
                    text: "Run Away",
                    destination: 3
                }
            ]
        },
        {
            id: 3,
            text: "You see a dark room full of skulls",
            actions: [
                {
                    text: "Attack",
                    destination: 4
                },
                {
                    text: "Run Away",
                    destination: 4
                }
            ]
        },
        {
            id: 4,
            text: "You see a dark room full of skulls",
            actions: [
                {
                    text: "Attack",
                    destination: 1
                },
                {
                    text: "Run Away",
                    destination: 1
                }
            ]
        }
    ]
};

function loadScene() {
    fadeButtons();
    currentRoom = rooms[roomId];
    currentRoom.showName();
    currentRoom.showImage();
    currentStory = story[currentRoom.id].find(currentStory => currentStory.id === storyId);
    let c = 0;
    typeWriter = setInterval(() => {
        paragraph.textContent += currentStory.text.charAt(c++);
        finishedTyping = false;
        if (c > currentStory.text.length) {
            finishedTyping = true;
            clearInterval(typeWriter);
        }
    }, 50);
    actions = currentStory.actions;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = actions[i].text;
    }
    if (story[currentRoom.id][storyId].id > story[currentRoom.id].length) {
        alert("Something went wrong. Game restarted");
        startGame();
        return;
    }
}

let onClick = [];

function handleClicks() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeEventListener("click", onClick[i]);
        onClick[i] = function() {
            if (!finishedTyping) {
                clearInterval(typeWriter);
            } 
            paragraph.textContent = "";
            switch(true) {
                case (actions[i].hasOwnProperty("destination")):
                    storyId = actions[i].destination;
                    loadScene(roomId, storyId);
                    break;
                case (actions[i].hasOwnProperty("exit")):
                    roomId = actions[i].exit;
                    nextRoom();
            }
            if (currentStory.hasOwnProperty("showImage")) {
                currentStory.showImage.showImage();
            }
            if (currentStory.hasOwnProperty("deleteImage")) {
                currentStory.deleteImage.deleteImage();
            }
            if (actions[i].hasOwnProperty("damage")) {
                player.takeDamage(actions[i].damage.attack);
            }
            if (actions[i].hasOwnProperty("attack")) {
                actions[i].attack.takeDamage(player.attack);
            }
        }
        buttons[i].addEventListener("click", onClick[i]);
    }
}

function fadeButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add("fade");
        setTimeout(() => {
        buttons[i].classList.remove("fade");
    }, 1000);
    }
}

function fadeImage() {
    roomImage.classList.add("fade");
    roomName.classList.add("fade");
        setTimeout(() => {
            roomImage.classList.remove("fade");
            roomName.classList.remove("fade");
    }, 1000);
}

function startGame() {
    roomId = rooms.GrayRoom.id;
    storyId = 1;
    textContainer.appendChild(paragraph);
    loadScene();
    handleClicks(); 
    fadeImage();
}

function nextRoom() {
    setTimeout(() => {
        fadeImage();
        textContainer.appendChild(paragraph);
        storyId = 1;
        loadScene();
        handleClicks(); 
    }, 250);
}

startGame();
