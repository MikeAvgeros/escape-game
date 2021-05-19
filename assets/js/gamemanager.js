const textContainer = document.getElementById("room-description");
const paragraph = document.createElement("p");
const buttons = document.getElementsByClassName("action-button");
const roomImage = document.getElementById("room-img");
const roomName = document.getElementById("room-name");
const root = document.documentElement;

let roomId;
let storyId;
let currentRoom;
let currentStory;
let actions;
let finishedTyping;
let typeWriter;

const player = new Player("Mike", 100, 50, 30);

const maxHealth = player.health;
let healthBarWidth;

function calculateHealthWidth() {
    healthBarWidth = (player.health / maxHealth) * 100;
    root.style.setProperty('--width', healthBarWidth + "%");
}

const itemImg = {
    2: "./assets/img/1.jpg"
}

const items = {
    1: new Item("key", "img"),
    2: new Item("glass", itemImg[2])
};

const enemies = {
    robot: new Character("robot", 50, 40, 20)
};

const roomImg = {
    1: "./assets/img/1.jpg",
    2: "./assets/img/2.jpg"
};

const rooms = {
    1: new Room("Gray Room", roomImg[1], 1),
    2: new Room("Skull Room", roomImg[2], 2)
};
    
const story = {
    1: [
        {
            id: 1,
            text: "1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!",
            actions: [
                {
                    text: "Lorem",
                    destination: 2
                },
                {
                    text: "Ipsum",
                    destination: 3
                }
            ]
        },
        {
            id: 2,
            text: "2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!",
            actions: [
                {
                    text: "Lorem",
                    destination: 3
                    
                },
                {
                    text: "Ipsum",
                    destination: 4
                }
            ]
        },
        {
            id: 3,
            text: "3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!",
            actions: [
                {
                    text: "Lorem",
                    destination: 4
                },
                {
                    text: "Ipsum",
                    destination: 5
                }
            ]
        },
        {
            id: 4,
            text: "4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!",
            actions: [
                {
                    text: "Lorem",
                    destination: 5
                },
                {
                    text: "Ipsum",
                    destination: 6
                }
            ]
        },
        {
            id: 5,
            text: "5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!",
            actions: [
                {
                    text: "Lorem",
                    destination: 6
                },
                {
                    text: "Ipsum",
                    destination: 7
                }
            ]
        },
        {
            id: 6,
            text: "6 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!",
            actions: [
                {
                    text: "Lorem",
                    exit: 7
                },
                {
                    text: "Ipsum",
                    exit: 1
                }
            ]
        },
        {
            id: 7,
            text: "7 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!",
            actions: [
                {
                    text: "Lorem",
                    exit: 2
                },
                {
                    text: "Ipsum",
                    exit: 2
                }
            ]
        }
    ],
    2: [
        {
            id: 1,
            text: "1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!",
            actions: [
                {
                    text: "Lorem",
                    destination: 2
                },
                {
                    text: "Ipsum",
                    destination: 3
                }
            ]
        },
        {
            id: 2,
            text: "2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!",
            actions: [
                {
                    text: "Lorem",
                    destination: 3
                    
                },
                {
                    text: "Ipsum",
                    destination: 4
                }
            ]
        },
        {
            id: 3,
            text: "3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!",
            actions: [
                {
                    text: "Lorem",
                    destination: 4
                },
                {
                    text: "Ipsum",
                    destination: 5
                }
            ]
        },
        {
            id: 4,
            text: "4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!",
            actions: [
                {
                    text: "Lorem",
                    destination: 5
                },
                {
                    text: "Ipsum",
                    destination: 6
                }
            ]
        },
        {
            id: 5,
            text: "5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!",
            actions: [
                {
                    text: "Lorem",
                    destination: 6
                },
                {
                    text: "Ipsum",
                    destination: 7
                }
            ]
        },
        {
            id: 6,
            text: "6 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!",
            actions: [
                {
                    text: "Lorem",
                    exit: 7
                },
                {
                    text: "Ipsum",
                    exit: 1
                }
            ]
        },
        {
            id: 7,
            text: "7 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!",
            actions: [
                {
                    text: "Lorem",
                    exit: 1
                },
                {
                    text: "Ipsum",
                    exit: 1
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
                calculateHealthWidth();
                player.checkIsDead();
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
    roomId = 1;
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
