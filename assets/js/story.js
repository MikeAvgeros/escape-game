/* jshint esversion: 8 */

export const player = new Player("", 100, 50, 30);

const itemImg = {
    testItem: "./assets/img/1.jpg"
}

const items = {
    testItem: new Item("testItem", itemImg.testItem),
};

const enemyImg = {
    robot: "./assets/img/2.jpg"
}

const enemies = {
    robot: new Character("Robot", 60, 40, 20, enemyImg.robot)
};

export function getStory(player) {
    return {
        1: [
            {
                id: 1,
                text: `${player.name} 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!`,
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
                enemy: enemies.robot,
                fadeImage: true,
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
                item: items.testItem,
                text: "3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, eum!",
                fadeImage: true,
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
                        destination: 7
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
                        destination: 7
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
}
