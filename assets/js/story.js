/* jshint esversion: 8 */

export const player = new Player("", 100, 50, 30);

const itemImg = {
    card: "./assets/img/1.jpg"
}

const items = {
    card: new Item("card", itemImg.card),
};

const enemyImg = {
    thief: "./assets/img/2.jpg"
}

const enemies = {
    thief: new Character("Thief", 80, 40, 20, enemyImg.thief)
};

export function getStory(player) {
    return {
        1: [
            {
                id: 1,
                text: `Welcome ${player.name}! To play the game, you need to choose an action from the buttons below. Be careful as some choices may lead to your player's untimely death. Are you ready?`,
                actions: [
                    {
                        text: "Play",
                        nextRoom: 2
                    },
                    {
                        text: "Exit",
                        storyNode: 1
                    }
                ]
            }
        ],
        2: [
            {
                id: 1,
                text: `You step off the bus on your way home after a long day at work. At the bus stop, an old man approaches you and asks if you can give him some money. What do you do?`,
                actions: [
                    {
                        text: "Ignore him",
                        storyNode: 2
                    },
                    {
                        text: "Give him money",
                        storyNode: 3
                    }
                ]
            },
            {
                id: 2,
                text: "Disheartened, the old man walks away. As you carry on walking, you see a shift in the shadows to your right. What do you do?",
                actions: [
                    {
                        text: "Start running",
                        storyNode: 5
                        
                    },
                    {
                        text: "Look to your right",
                        storyNode: 4
                    }
                ]
            },
            {
                id: 3,
                text: "The man warns you to turn back. He tells you that there is danger ahead and you should turn back. What do you do?",
                actions: [
                    {
                        text: "Ignore him",
                        storyNode: 2
                    },
                    {
                        text: "Turn back",
                        storyNode: 6
                    }
                ]
            },
            {
                id: 4,
                text: `A shadowy figure jumps at you and throws you to the ground. "Give me your money", he says.`,
                enemy: enemies.thief,
                actions: [
                    {
                        text: "Give him money",
                        storyNode: 7
                    },
                    {
                        text: "Attack him",
                        attackEnemy: enemies.thief,
                        storyNode: 9,
                        storyNodeAfterKill: 10
                    }
                ]
            },
            {
                id: 5,
                text: `As you start to run, the old man trips you with his staff and you fall to the floor and hurt yourself. A shadowy figure jumps at you and says "Give me your money"`,
                actions: [
                    {
                        text: "Give him money",
                        storyNode: 7
                    },
                    {
                        text: "Fight back",
                        storyNode: 9
                    }
                ]
            },
            {
                id: 6,
                text: "You walk away from the alleway and escape the danger that's lurking in the shadows. What do you do next?",
                actions: [
                    {
                        text: "Walk home",
                        nextRoom: 2
                    },
                    {
                        text: "Thank the old man",
                        storyNode: 8
                    }
                ]
            },
            {
                id: 7,
                text: "The mugger punches you in the face and takes your money and leaves you on the ground, bleeding. What do you do?",
                actions: [
                    {
                        text: "Chase the mugger",
                        nextRoom: 3
                    },
                    {
                        text: "Walk home",
                        nextRoom: 2
                    }
                ]
            },
            {
                id: 8,
                text: `The old man takes a liking at you and gives you a card with an address on it. What do you do?`,
                item: items.card,
                actions: [
                    {
                        text: "Ignore it and walk home",
                        nextRoom: 2
                    },
                    {
                        text: "Go to that address",
                        nextRoom: 4
                    }
                ]
            },
            {
                id: 9,
                text: "You attacked the mugger but he is still standing and attacked you back. What do you do?",
                enemy: enemies.thief,
                actions: [
                    {
                        text: "Attack again",
                        attackEnemy: enemies.thief,
                        storyNode: 9,
                        storyNodeAfterKill: 10
                    },
                    {
                        text: "Run away",
                        nextRoom: 2
                    }
                ]
            },
            {
                id: 10,
                text: "You have successfully killed the attacker. What do you want to do next?",
                actions: [
                    {
                        text: "Walk home",
                        nextRoom: 2
                    },
                    {
                        text: "Run away",
                        nextRoom: 2
                    }
                ]
            }
        ]
    };
}
