/* jshint esversion: 8 */

export const player = new Player("", 100, 50, 30);

const itemImg = {
    card: "./assets/img/1.jpg"
}

const items = {
    card: new Item("a card with an address on it", itemImg.card),
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
                text: `Welcome ${player.name}! To play the game, you need to choose an action from the 2 buttons below. 
                Each choice will lead to a different outcome in the story.
                Be careful as some choices may lead to your untimely death. 
                Are you ready to play or would you like to learn more?`,
                actions: [
                    {
                        text: "Play",
                        nextRoom: 2
                    },
                    {
                        text: "Learn",
                        nextScene: 2
                    }
                ]
            },
            {
                id: 2,
                text: `You can view your stats by clicking on the info icon above the image. 
                A live display of your health points is displayed on the bar next to the info icon. 
                You can open your item list to view any items you have collected by clicking on the bag icon.`,
                actions: [
                    {
                        text: "Play",
                        nextRoom: 2
                    },
                    {
                        text: "Repeat",
                        nextScene: 1
                    }
                ]
            }
        ],
        2: [
            {
                id: 1,
                text: `The year is 2054 and gene-editing has allowed humans to evolve beyond the physical limitations of their bodies.
                BioTech, a large corporation owned by the government, controls 90% of all bio-hacking operations in the entire world.
                The headquarters of BioTech are in Cyber City, the financial capital of the world.
                You are ${player.name}, a security guard at BioTech, born and bred in Cyber City.`,
                actions: [
                    {
                        text: "Continue story",
                        nextScene: 2
                    },
                    {
                        text: "Quit game",
                        reload: true
                    }
                ]
            },
            {
                id: 2,
                text: `You had a long day at work and it's getting late. 
                Your colleague looks at you and says
                "It's best if you leave and go to rest. Tomorrow will be a tough day. 
                The CEO is visiting HQ and tensions with the protesters are rising. 
                I guess not everyone appreciates what we do here."`,
                actions: [
                    {
                        text: "Go home",
                        nextRoom: 3
                    },
                    {
                        text: "Stay at work",
                        nextScene: 3
                    }
                ]
            },
            {
                id: 3,
                text: `Another hour passes at work. Everything seems quiet. 
                You watch the news and hear about the protests against bio-enhanced humans. 
                All of a sudden, the lights in the building go off.`,
                actions: [
                    {
                        text: "Go check",
                        nextScene: 4
                    },
                    {
                        text: "Do nothing",
                        nextScene: 6
                    }
                ]
            },
            {
                id: 4,
                text: `You go to the basement to check the power generator. 
                It appears that someone has cut the cables and destroyed the backup generator.
                You then hear a noise from the adjacent room.`,
                actions: [
                    {
                        text: "Go check",
                        nextScene: 5
                    },
                    {
                        text: "Return to your post",
                        nextScene: 6
                    }
                ]
            },
            {
                id: 5,
                text: `As you are inspecting the room, a man with a face mask jumps at you and throws to you the ground. "Give me your keycard to the lab" he says.`,
                enemy: enemies.thief,
                actions: [
                    {
                        text: "Attack him",
                        nextScene: 5
                    },
                    {
                        text: "Do what he says",
                        nextScene: 6
                    }
                ]
            }
        ],
        3: [
            {
                id: 1,
                text: `You step off the bus on your way home. At the bus stop, an old man, who appears to be enhanced, approaches you and asks if you can give him some money.`,
                actions: [
                    {
                        text: "Ignore him",
                        nextScene: 2
                    },
                    {
                        text: "Give him money",
                        nextScene: 3
                    }
                ]
            },
            {
                id: 2,
                text: "The old man walks away. As you carry on walking, you see a shift in the shadows to your right. You feel something is not right.",
                actions: [
                    {
                        text: "Start running",
                        nextScene: 5
                        
                    },
                    {
                        text: "Look to your right",
                        nextScene: 4
                    }
                ]
            },
            {
                id: 3,
                text: "The man warns you to turn back. He tells you there is danger ahead. Someone who knows where you work, wants to steal your keycard to the lab.",
                actions: [
                    {
                        text: "Ignore him",
                        nextScene: 2
                    },
                    {
                        text: "Turn back",
                        nextScene: 6
                    }
                ]
            },
            {
                id: 4,
                text: `A shadowy figure jumps at you and throws you to the ground. "Give me your work keycard", he says.`,
                enemy: enemies.thief,
                actions: [
                    {
                        text: "Do what he says",
                        nextScene: 7
                    },
                    {
                        text: "Attack him",
                        attackEnemy: enemies.thief,
                        nextScene: 9,
                        storyNodeAfterKill: 10
                    }
                ]
            },
            {
                id: 5,
                text: `As you start to run, a shadowy figure blasts you to the floor with a sonic gun. He comes at you and says "Give me your wallet and keycard"`,
                actions: [
                    {
                        text: "Do what he says",
                        nextScene: 7
                    },
                    {
                        text: "Attack him",
                        nextScene: 9
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
                        nextScene: 8
                    }
                ]
            },
            {
                id: 7,
                text: "The thief punches you in the face and takes your wallet and keycard and leaves you on the ground.",
                actions: [
                    {
                        text: "Chase the thief",
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
                text: `The old man takes a liking at you and gives you ${items.card.name}. What do you do?`,
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
                        nextScene: 9,
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
