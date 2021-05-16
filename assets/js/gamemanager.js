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
    room1: "./assets/img/graypaintedroom.jpg",
    room2: "./assets/img/skullroom.jpg"
};

const rooms = [
    room1 = new Room("Gray Room", roomImg.room1, 1),
    room2 = new Room("Skull Room", roomImg.room2, 2)
];

const story = {
    1: [
        {
            id: 0,
            text: `${player.name}, you wake up in a dark empty room tied to a chair.`,
            actions: [
                {
                    text: "Examine Room",
                    destination: 1
                },
                {
                    text: "Break Free",
                    response: "You try to break free but the rope is too tight."
                }
            ]
        },
        {
            id: 1,
            text: `You notice a broken ${items.item2.name} on the floor next to you.`,
            actions: [
                {
                    text: `Take ${items.item2.name}`,
                    destination: 2
                    
                },
                {
                    text: "Do nothing",
                    response: "Doing nothing won't help you here. You need to escape."
                }
            ]
        },
        {
            id: 2,
            text: `Your body falls on the floor and your hand reaches the broken ${items.item2.name}.`,
            showImage: items.item2,
            actions: [
                {
                    text: "Cut Rope",
                    destination: 3,
                },
                {
                    text: "Kill Yourself",
                    response: "You can't kill yourself because you're tied up in the chair."
                }
            ]
        },
        {
            id: 3,
            text: "You manage to cut the rope and break free. You see a door to your right.",
            deleteImage: items.item2,
            actions: [
                {
                    text: "Open Door",
                    response: "The door appears to be locked."
                },
                {
                    text: "Examine Room",
                    destination: 4
                }
            ]
        },
        {
            id: 4,
            text:`You see a rusty ${items.item1.name} in the corner of the room.`,
            actions: [
                {
                    text: `Use the ${items.item1.name}`,
                    destination: 5
                },
                {
                    text: "Smash Door",
                    response: "You try to smash the door but it doesn't work and you hurt yourself."
                }
            ]
        },
        {
            id: 5,
            text: "You have successfully opened the door!",
            actions: [
                {
                    text: `Exit Room`,
                    exit: 2
                },
                {
                    text: "Stay Here",
                    response: "Perhaps, it's best to move on."
                }
            ]
        }
    ],
    2: [
        {
            id: 0,
            text: "You see a dark room full of skulls.",
            actions: [
                {
                    text: "Examine Room",
                    destination: 1
                },
                {
                    text: "Go Back",
                    response: `The door behind you closes and a ${enemies.robot.name} attacks you.`,
                    damage: enemies.robot
                }
            ]
        },
        {
            id: 1,
            text: "You see a dark room full of skulls",
            actions: [
                {
                    text: "Attack",
                    attack: enemies.robot
                },
                {
                    text: "Run Away",
                    response: "You can't run away"
                }
            ]
        }
    ],
};

function loadScene() {
    fadeButtons();
    currentRoom = rooms[roomId];
    currentRoom.showName();
    currentRoom.showImage();
    currentStory = story[currentRoom.id].find(currentStory => currentStory.id === storyId);
    paragraph.innerHTML = "";
    for (let c = 0; c < currentStory.text.length; c++) {
        setTimeout(function (char) {
            return function () { paragraph.innerHTML += char; };
        }(currentStory.text[c]), c * 50);
    }
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
            switch(true) {
                case (actions[i].hasOwnProperty("response")):
                    paragraph.innerHTML = "";
                    for (let c = 0; c < actions[i].response.length; c++) {
                        setTimeout(function (char) {
                            return function () { paragraph.innerHTML += char; };
                        }(actions[i].response[c]), c * 50);
                    }
                    break;
                case (actions[i].hasOwnProperty("destination")):
                    storyId = actions[i].destination;
                    loadScene(roomId, storyId);
                    break;
                case (actions[i].hasOwnProperty("exit")):
                    for (let i = 0; i < buttons.length; i++) {
                        buttons[i].style.display = "none";
                    }
                    textContainer.innerHTML = "";
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
    roomId = 0;
    storyId = 0;
    textContainer.appendChild(paragraph);
    loadScene();
    handleClicks(); 
    fadeImage();
}

function nextRoom() {
    setTimeout(() => {
        fadeImage();
        textContainer.appendChild(paragraph);
        roomId++;
        storyId = 0;
        loadScene();
        handleClicks(); 
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.display = "initial";
        }
    }, 250);
}

startGame();
