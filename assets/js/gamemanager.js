const textContainer = document.getElementById("room-description");
const buttons = document.getElementsByClassName("action-button");

let roomId;
let storyId;

const player = new Player("Mike", 100, 50, 30);

const items = {
    item1: new Item("key", "img"),
    item2: new Item("glass", "../escape-game/assets/img/skullroom.jpg")
};

const enemies = {
    robot: new Character("robot", 50, 40, 20)
};

const images = {
    room1: "../escape-game/assets/img/graypaintedroom.jpg",
    room2: "../escape-game/assets/img/skullroom.jpg"
};

const rooms = [
    room1 = new Room("Gray Room", images.room1, 1),
    room2 = new Room("Skull Room", images.room2, 2)
];

const story = getStory(player, items, enemies);

function getStory(player, items, enemies) {
    return {
        1: [
            {
                id: 0,
                text: `${player.name}, you wake up in a dark empty room tied firmly to a chair.`,
                actions: [
                    {
                        text: "Examine Room",
                        destination: 1
                    },
                    {
                        text: "Break Free",
                        response: "You try to break free but the rope is too tight"
                    }
                ]
            },
            {
                id: 1,
                text: `You notice a broken ${items.item2.name} on the floor next to you.`,
                actions: [
                    {
                        text: `Take ${items.item2.name}`,
                        destination: 2,
                        image: items.item2
                    },
                    {
                        text: "Do nothing",
                        response: "Doing nothing won't help you here. You need to escape"
                    }
                ]
            },
            {
                id: 2,
                text: `Your body falls on the floor and your hand reaches the broken ${items.item2.name}`,
                actions: [
                    {
                        text: "Cut Rope",
                        destination: 3,
                    },
                    {
                        text: "Kill Yourself",
                        response: "You can't kill yourself because you're tied up in the chair"
                    }
                ]
            },
            {
                id: 3,
                text: "You manage to cut the rope and break free. You see a door to your right.",
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
                text: "You see a dark room full of skulls",
                actions: [
                    {
                        text: "Examine Room",
                        destination: 1
                    },
                    {
                        text: "Go Back",
                        response: `The door behind you closes and a ${enemies.robot.name} attacks you`,
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
    }
};

function showRoom(roomId) {
    let currentRoom = rooms[roomId];
    currentRoom.showName();
    currentRoom.showImage();
}

let onClick = [];

function showStory(roomId, storyId, player) {
    let currentRoom = rooms[roomId];
    let currentStory = story[currentRoom.id].find(currentStory => currentStory.id === storyId);
    textContainer.innerHTML = `<p id="story-text">${currentStory.text}</p>`;
    let actions = currentStory.actions;
    if (story[currentRoom.id][storyId].id > story[currentRoom.id].length) {
        alert("Something went wrong. Game restarted");
        startGame();
        return;
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = actions[i].text;
        buttons[i].removeEventListener("click", onClick[i]);
        onClick[i] = function() {
            switch(true) {
                case (actions[i].hasOwnProperty("response")):
                    textContainer.innerHTML = `<p id="story-text">${actions[i].response}</p>`;
                    break;
                case (actions[i].hasOwnProperty("destination")):
                    showStory(roomId, actions[i].destination);
                    fadeButtons();
                    break;
                case (actions[i].hasOwnProperty("exit")):
                    for (let i = 0; i < buttons.length; i++) {
                        buttons[i].style.display = "none";
                    }
                    textContainer.innerHTML = "";
                    nextRoom();
            }
            if (actions[i].hasOwnProperty("image")) {
                actions[i].image.showImage();
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

function startGame() {
    roomId = 0;
    storyId = 0;
    showRoom(roomId);
    showStory(roomId, storyId, player); 
}

function nextRoom() {
    setTimeout(() => {
        roomId++;
        storyId = 0;
        showRoom(roomId);
        showStory(roomId, storyId, player); 
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.display = "initial";
        }
    }, 250);
}

startGame();
