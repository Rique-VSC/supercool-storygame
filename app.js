const playerData = {
    lab: localStorage.getItem("cartLab") || "Student",
    classmate: localStorage.getItem("classmateName") || "CART lab",
    teacher: localStorage.getItem("teacherName") || "Professor"
};










// gameplay down below
const starterThemes = {
    fire: "#e74c3c",
    water: "#50caf6",
    grass: "#2ecc71",
    electric: "#ebd540",
    ground: "#876414",
    flying: "#d8fff8",
    dark: "#5a4a69",
    psychic: "#b98ee0",
    fairy: "#ffe0fd",
    dragon: "#4f82bc",
    normal: "#c9c9c9",
    fighting: "#e9a125",
    rock: "#44413d",
    ghost: "#a618ff",
    poison: "#8a139a"
};

function setStarterTheme(pokemonName) {
    const color = starterThemes[pokemonName] || "white";
    document.documentElement.style.setProperty("--starter-color", color);
}


const gameState = {
    starter: null,
    party: [],
    currentEncounter: null
};


function fiftyfifty() {
    let result = 'lost';
    if (Math.random() < .5) {
        result = 'won';
    }
    return result;
}

function capture() {
    let result = 'failed to capture';
    if (Math.random() < .5) {
        result = 'caught';
    }
    return result;
}

// pokemon battle thingy
function battlePokemon(pokemonName, nextRoute, retryScene) {
    const result = fiftyfifty()
    if (result === "won") {
        addPokemonToParty(pokemonName);
    }

    return {
        result,
        next: result === "won"
            ? nextRoute
            : retryScene,
        text: `You ${result} against ${pokemonName}`
    };
}

// pokemon catch thingy
function catchPokemon(pokemonName, nextRoute, retryScene) {
    const result = capture();

    if (result === "caught") {
        addPokemonToParty(pokemonName);
    }

    return {
        result,
        next: result === "caught"
            ? nextRoute
            : retryScene,
        text: `You ${result} ${pokemonName}`
    };
}

// pokemon party 
function addPokemonToParty(pokemonName) {
    if (gameState.party.length < 6) {
        gameState.party.push(pokemonName);
        updateInventory();
    }
}
// pokemon inventory update
function updateInventory() {
    const inventory = document.getElementById("pokemonInventory");

    inventory.innerHTML = "";

    gameState.party.forEach((pokemon, index) => {
        const slot = document.createElement("div");
        slot.classList.add("pokemon-slot");

        slot.textContent = pokemon;

        inventory.appendChild(slot);
    });

    // filling empty slots
    for (let i = gameState.party.length; i < 6; i++) {
        const emptySlot = document.createElement("div");
        emptySlot.classList.add("pokemon-slot");
        emptySlot.textContent = "Empty";
        inventory.appendChild(emptySlot);

    }
}

const scenes = {
    captured: {
        dialogue: () => `${gameState.starter} was caught!`,
        background: "route1.png",
        next: "intro"
    },
    capturefailed: {
        dialogue: () => `${gameState.starter} escaped!`,
        background: "route1.png",
        next: "routeOne1"
    },


    intro: {
        dialogue: `Today is the day you get to go out on your Pokemon journey in the CART region! This is your town, ${playerData.lab}, and today is the day you leave to adventure!`,
        background: "bg1.png",
        next: "intro2"
    },

    intro2: {
        dialogue: `You make your way towards the laboratory, where you meet Professor ${playerData.teacher}. They will let you pick your very first Pokemon.`,
        background: "bg2.png",
        next: "intro3"
    },

    intro3: {
        dialogue: `You also meet your classmate ${playerData.classmate} at the lab, who is also starting their Pokemon journey as well. ${playerData.classmate} insists you go first to choose your partner.`,
        background: "bg2.png",
        next: "starterOption"
    },

    starterOption: {
        dialogue: "Who would you like to join you on your journey?",
        background: "bg2.png",
        options: [
            {
                text: "Litten",
                type: "fire",
                img: "litten.png",
                action: () => {
                    gameState.starter = "Litten";
                    addPokemonToParty("Litten");
                },
                next: "chosenStarter"
            },
            {
                text: "Froakie",
                type: "water",
                img: "froakie.png",
                action: () => {
                    gameState.starter = "Froakie";
                    addPokemonToParty("Froakie");
                },
                next: "chosenStarter"
            },
            {
                text: "Treecko",
                type: "grass",
                img: "treecko.png",
                action: () => {
                    gameState.starter = "Treecko";
                    addPokemonToParty("Treecko");
                },
                next: "chosenStarter" // maybe fix this soon or make a function that based on what pokemon u pick as your starter the ending is different
            }
        ]
    },


    chosenStarter: {
        dialogue: () => `You chose a ...${gameState.starter}!`,
        background: "bg2.png",
        next: "intro4"
    },
    intro4: {
        dialogue: () => `You picked ${gameState.starter}! After your pick, ${playerData.classmate} picks theirs and you both go on your separate ways.`,
        background: "bg2.png",
        next: "routeOne1"
    },


































    //route 1!!!!
    routeOne1: {
        dialogue: "You reach route 1: Grassy Terrains. It has a large field of yellow patches of grass.",
        background: "route1.png",
        next: "routeOne2"
    },
    routeOne2: {
        dialogue: "You find three unique Pokemon, but you can't see them through all the tall grass! However, you could only battle one and catch one of them…",
        background: "route1.png",
        next: "routeOne3"
    },
    routeOne3: {
        dialogue: "There are three Pokemons hiding, which one should you encounter and catch?",
        background: "route1.png",
        options: [
            {
                text: "Psychic",
                type: "psychic",
                action: () => {
                    gameState.currentEncounter = "Wynaut";
                },
                next: "chosenWynaut"
            },
            {
                text: "Ground",
                type: "ground",
                action: () => {
                    gameState.currentEncounter = "Cubone";
                },
                next: "chosenCubone"
            },
            {
                text: "Normal",
                type: "normal",
                action: () => {
                    gameState.currentEncounter = "Munchlax";
                },
                next: "chosenMunchlax"
            }
        ]
    },

    //wynaut option
    chosenWynaut: {
        dialogue: "A wild Wynaut has appeared! What will you do?",
        img: "wynaut.png",
        background: "route1.png",
        options: [
            {
                text: "Fight",
                next: "fightWynaut"
            },
            {
                text: "Catch",
                next: "catchWynaut"
            },
            {
                text: "Run",
                next: "runFromWynaut"
            }
        ]


    },
    fightWynaut: {
        dialogue: `You chose to fight ...Wynaut!`,
        img: "wynaut.png",
        background: "route1.png",
        next: "Wynautfight",
    },



    catchWynaut: {
        dialogue: `You chose to catch ...Wynaut!`,
        img: "wynaut.png",
        background: "route1.png",
        next: "Wynautcapture",
    },

    runFromWynaut: {
        dialogue: `You attempted to flee from ...Wynaut!`,
        img: "wynaut.png",
        background: "route1.png",
        next: "RunawayWynaut",
    },


    Wynautfight: {


        dialogue: function () {
            const battle = battlePokemon("Wynaut", "routetwo1", "chosenWynaut");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "wynaut.png",
        background: "route1.png",

        next: function () {
            return this.nextScene;
        }
    },

    Wynautcapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Wynaut", "routetwo1", "chosenWynaut")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "wynaut.png",
        background: "route1.png",

        next: function () {
            return this.nextScene;
        }
    },

    RunawayWynaut: {
        dialogue: `You successfully ran away from Wynaut...`,
        background: "blackscreen.jpg",
        next: "routetwo1",
    },


    // cubone option
    chosenCubone: {
        dialogue: "A wild Cubone has appeared! What will you do?",
        img: "cubone.png",
        background: "route1.png",
        options: [
            {
                text: "Fight",
                next: "fightCubone"
            },
            {
                text: "Catch",
                next: "catchCubone"
            },
            {
                text: "Run",
                next: "runFromCubone"
            }
        ]
    },
    fightCubone: {
        dialogue: `You chose to fight ...Cubone!`,
        img: "cubone.png",
        background: "route1.png",
        next: "Cubonefight"
    },
    catchCubone: {
        dialogue: `You chose to catch ...Cubone!`,
        img: "cubone.png",
        background: "route1.png",
        next: "Cubonecapture",
    },
    runFromCubone: {
        dialogue: `You attempted to flee from ...Cubone!`,
        img: "cubone.png",
        background: "route1.png",
        next: "Cubonerun",
    },

    Cubonefight: {
        dialogue: function () {
            const battle = battlePokemon("Cubone", "routetwo1", "chosenCubone");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "cubone.png",
        background: "route1.png",

        next: function () {
            return this.nextScene;
        }
    },

    Cubonecapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Cubone", "routetwo1", "chosenCubone")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "cubone.png",
        background: "route1.png",

        next: function () {
            return this.nextScene;
        }
    },

    Cubonerun: {
        dialogue: `You successfully ran away from Cubone...`,
        background: "blackscreen.jpg",
        next: "routetwo1",
    },

    // munchlax option
    chosenMunchlax: {
        dialogue: "A wild Munchlax has appeared! What will you do?",
        img: "munchlax.png",
        background: "route1.png",
        options: [
            {
                text: "Fight",
                next: "fightMunchlax"
            },
            {
                text: "Catch",
                next: "catchMunchlax"
            },
            {
                text: "Run",
                next: "runFromMunchlax"
            }
        ]
    },
    fightMunchlax: {
        dialogue: `You chose to fight ...Munchlax!`,
        img: "munchlax.png",
        background: "route1.png",
        next: "Munchlaxfight"
    },
    catchMunchlax: {
        dialogue: `You chose to catch ...Munchlax!`,
        img: "munchlax.png",
        background: "route1.png",
        next: "CatchMunchlax",
    },
    runFromMunchlax: {
        dialogue: `You attempted to flee from ...Munchlax!`,
        img: "munchlax.png",
        background: "route1.png",
        next: "Munchlaxrun",
    },


    Munchlaxfight: {
        dialogue: function () {
            const battle = battlePokemon("Munchlax", "routetwo1", "chosenMunchlax");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "munchlax.png",
        background: "route1.png",

        next: function () {
            return this.nextScene;
        }
    },

    CatchMunchlax: {
        dialogue: function () {
            const captureResult = catchPokemon("Munchlax", "routetwo1", "chosenMunchlax")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "munchlax.png",
        background: "route1.png",

        next: function () {
            return this.nextScene;
        }
    },
    Munchlaxrun: {
        dialogue: `You successfully ran away from Munchlax...`,
        background: "blackscreen.jpg",
        next: "routetwo1",
    },





























    //route 2!!!
    routetwo1: {
        dialogue: `After your encounter, you reach route 2: Berry Woods.`,
        background: "route2.png",
        next: "routetwo2",

    },

    routetwo2: {
        dialogue: `This area is a forest filled with unique Pokemon. You and your Pokemon decided to rest for a while in this nice environment, so you sit around underneath a tree. `,
        background: "route2.png",
        next: "routetwo3",
    },

    routetwo3: {
        dialogue: `But suddenly, you hear the bushes rustling close by.`,
        background: "route2.png",
        next: "routetwo4",
    },

    routetwo4: {
        dialogue: `You notice there are three Pokemon hiding in the bush and preparing a battle with you! `,
        background: "route2.png",
        next: "routetwo5",
    },

    routetwo5: {
        dialogue: `However, you can only fight one of them, so which would it be?`,
        background: "route2.png",
        options: [
            {
                text: "Fairy",
                type: "fairy",
                action: () => {
                    gameState.currentEncounter = "Togepi";
                },
                next: "chosenTogepi"
            },
            {
                text: "Rock",
                type: "rock",
                action: () => {
                    gameState.currentEncounter = "Bonsly";
                },
                next: "chosenBonsly"
            },
            {
                text: "Poison",
                type: "poison",
                action: () => {
                    gameState.currentEncounter = "Nidoran";
                },
                next: "chosenNidoran"
            }
        ]
    },

    // togepi option
    chosenTogepi: {
        dialogue: "A wild Togepi has appeared! What will you do?",
        img: "togepi.png",
        background: "route2.png",
        options: [
            {
                text: "Fight",
                next: "fightTogepi"
            },
            {
                text: "Catch",
                next: "catchTogepi"
            },
            {
                text: "Run",
                next: "runFromTogepi"
            }
        ]
    },
    fightTogepi: {
        dialogue: `You chose to fight ...Togepi!`,
        img: "togepi.png",
        background: "route2.png",
        next: "Togepifight"
    },
    catchTogepi: {
        dialogue: `You chose to catch ...Togepi!`,
        img: "togepi.png",
        background: "route2.png",
        next: "Togepicapture",
    },
    runFromTogepi: {
        dialogue: `You attempted to flee from ...Togepi!`,
        img: "togepi.png",
        background: "route2.png",
        next: "Togepirun",
    },


    Togepifight: {
        dialogue: function () {
            const battle = battlePokemon("Togepi", "routethree1", "chosenTogepi");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "togepi.png",
        background: "route2.png",

        next: function () {
            return this.nextScene;
        }
    },

    Togepicapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Togepi", "routethree1", "chosenTogepi")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "togepi.png",
        background: "route2.png",

        next: function () {
            return this.nextScene;
        }
    },
    Togepirun: {
        dialogue: `You successfully ran away from Togepi...`,
        background: "blackscreen.jpg",
        next: "routethree1",
    },





    // Bonsly option
    chosenBonsly: {
        dialogue: "A wild Bonsly has appeared! What will you do?",
        img: "bonsly.png",
        background: "route2.png",
        options: [
            {
                text: "Fight",
                next: "fightBonsly"
            },
            {
                text: "Catch",
                next: "catchBonsly"
            },
            {
                text: "Run",
                next: "runFromBonsly"
            }
        ]
    },
    fightBonsly: {
        dialogue: `You chose to fight ...Bonsly!`,
        img: "bonsly.png",
        background: "route2.png",
        next: "Bonslyfight"
    },
    catchBonsly: {
        dialogue: `You chose to catch ...Bonsly!`,
        img: "bonsly.png",
        background: "route2.png",
        next: "Bonslycapture",
    },
    runFromBonsly: {
        dialogue: `You attempted to flee from ...Bonsly!`,
        img: "bonsly.png",
        background: "route2.png",
        next: "Bonslyrun",
    },


    Bonslyfight: {
        dialogue: function () {
            const battle = battlePokemon("Bonsly", "routethree1", "chosenBonsly");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "bonsly.png",
        background: "route2.png",

        next: function () {
            return this.nextScene;
        }
    },

    Bonslycapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Bonsly", "routethree1", "chosenBonsly")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "bonsly.png",
        background: "route2.png",

        next: function () {
            return this.nextScene;
        }
    },
    Bonslyrun: {
        dialogue: `You successfully ran away from Bonsly...`,
        background: "blackscreen.jpg",
        next: "routethree1",
    },




    // Nidoran option
    chosenNidoran: {
        dialogue: "A wild Nidoran has appeared! What will you do?",
        img: "nidoran.png",
        background: "route2.png",
        options: [
            {
                text: "Fight",
                next: "fightNidoran"
            },
            {
                text: "Catch",
                next: "catchNidoran"
            },
            {
                text: "Run",
                next: "runFromNidoran"
            }
        ]
    },
    fightNidoran: {
        dialogue: `You chose to fight ...Nidoran!`,
        img: "nidoran.png",
        background: "route2.png",
        next: "Nindoranfight"
    },
    catchNidoran: {
        dialogue: `You chose to catch ...Nidoran!`,
        img: "nidoran.png",
        background: "route2.png",
        next: "Nidorancapture",
    },
    runFromNidoran: {
        dialogue: `You attempted to flee from ...Nidoran!`,
        img: "nidoran.png",
        background: "route2.png",
        next: "Nidoranrun",
    },


    Nidoranfight: {
        dialogue: function () {
            const battle = battlePokemon("Nidoran", "routethree1", "chosenNidoran");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "nidoran.png",
        background: "route2.png",

        next: function () {
            return this.nextScene;
        }
    },

    Nidorancapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Nidoran", "routethree1", "chosenNidoran")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "nidoran.png",
        background: "route2.png",

        next: function () {
            return this.nextScene;
        }
    },
    Nidoranrun: {
        dialogue: `You successfully ran away from Nidoran...`,

        background: "blackscreen.jpg",
        next: "routethree1",
    },

























    //route THREEEEEEEE!!!
    routethree1: {
        dialogue: `Now you have reached route 3: Flatlands.`,
        background: "route3.png",
        next: "routethree2",

    },

    routethree2: {
        dialogue: `This route is a large green field that's next to a river. The day is almost over and you decided to set up camp for the evening. The sky finally turned dark and you and your pokemon are resting for the night.`,
        background: "route3.png",
        next: "routethree3",
    },

    routethree3: {
        dialogue: `But suddenly you hear some noises disturbing you in the tall grass. `,
        background: "route3.png",
        next: "routethree4",
    },

    routethree4: {
        dialogue: ` In the dark there are now three Pokemon near you, and you could only battle one of them.`,
        background: "route3.png",
        next: "routethree5",
    },

    routethree5: {
        dialogue: `Which one would you choose?`,
        background: "route3.png",
        options: [
            {
                text: "Ground/Dark",
                type: "dark",
                action: () => {
                    gameState.currentEncounter = "Krokorok";
                },
                next: "chosenKrokorok"
            },
            {
                text: "Ghost/Fire",
                type: "ghost",
                action: () => {
                    gameState.currentEncounter = "Lampent";
                },
                next: "chosenLampent"
            },
            {
                text: "Fighting/Flying",
                type: "fighting",
                action: () => {
                    gameState.currentEncounter = "Hawlucha";
                },
                next: "chosenHawlucha"
            }
        ]
    },

    // Krokorok option
    chosenKrokorok: {
        dialogue: "A wild Krokorok has appeared! What will you do?",
        img: "krokorok.png",
        background: "route3.png",
        options: [
            {
                text: "Fight",
                next: "fightKrokorok"
            },
            {
                text: "Catch",
                next: "catchKrokorok"
            },
            {
                text: "Run",
                next: "runFromKrokorok"
            }
        ]
    },
    fightKrokorok: {
        dialogue: `You chose to fight ...Krokorok!`,
        img: "krokorok.png",
        background: "route3.png",
        next: "Krokorokfight"
    },
    catchKrokorok: {
        dialogue: `You chose to catch ...Krokorok!`,
        img: "krokorok.png",
        background: "route3.png",
        next: "Krokorokcapture",
    },
    runFromKrokorok: {
        dialogue: `You attempted to flee from ...Krokorok!`,
        img: "krokorok.png",
        background: "route3.png",
        next: "Krokorokrun",
    },


    Krokorokfight: {
        dialogue: function () {
            const battle = battlePokemon("Krokorok", "routefour1", "chosenKrokorok");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "krokorok.png",
        background: "route3.png",

        next: function () {
            return this.nextScene;
        }
    },

    Krokorokcapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Krokorok", "routefour1", "chosenKrokorok")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "krokorok.png",
        background: "route3.png",

        next: function () {
            return this.nextScene;
        }
    },
    Krokorokrun: {
        dialogue: `You successfully ran away from Krokorok...`,
        background: "blackscreen.jpg",
        next: "routefour1",
    },





    // Lampent option
    chosenLampent: {
        dialogue: "A wild Lampent has appeared! What will you do?",
        img: "lampent.png",
        background: "route3.png",
        options: [
            {
                text: "Fight",
                next: "fightLampent"
            },
            {
                text: "Catch",
                next: "catchLampent"
            },
            {
                text: "Run",
                next: "runFromLampent"
            }
        ]
    },
    fightLampent: {
        dialogue: `You chose to fight ...Lampent!`,
        img: "lampent.png",
        background: "route3.png",
        next: "Lampentfight"
    },
    catchLampent: {
        dialogue: `You chose to catch ...Lampent!`,
        img: "lampent.png",
        background: "route3.png",
        next: "Lampentcapture",
    },
    runFromLampent: {
        dialogue: `You attempted to flee from ...Lampent!`,
        img: "lampent.png",
        background: "route3.png",
        next: "Lampentrun",
    },


    Lampentfight: {
        dialogue: function () {
            const battle = battlePokemon("Lampent", "routefour1", "chosenLampent");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "lampent.png",
        background: "route3.png",

        next: function () {
            return this.nextScene;
        }
    },

    Lampentcapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Lampent", "routefour1", "chosenLampent")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "lampent.png",
        background: "route3.png",

        next: function () {
            return this.nextScene;
        }
    },
    Lampentrun: {
        dialogue: `You successfully ran away from Lampent...`,
        background: "blackscreen.jpg",
        next: "routefour1",
    },




    // Hawlucha option
    chosenHawlucha: {
        dialogue: "A wild Hawlucha has appeared! What will you do?",
        img: "hawlucha.png",
        background: "route3.png",
        options: [
            {
                text: "Fight",
                next: "fightHawlucha"
            },
            {
                text: "Catch",
                next: "catchHawlucha"
            },
            {
                text: "Run",
                next: "runFromHawlucha"
            }
        ]
    },
    fightHawlucha: {
        dialogue: `You chose to fight ...Hawlucha!`,
        img: "hawlucha.png",
        background: "route3.png",
        next: "Hawluchafight"
    },
    catchHawlucha: {
        dialogue: `You chose to catch ...Hawlucha!`,
        img: "hawlucha.png",
        background: "route3.png",
        next: "Hawluchacapture",
    },
    runFromHawlucha: {
        dialogue: `You attempted to flee from ...Hawlucha!`,
        background: "route3.png",
        next: "Hawlucharun",
    },


    Hawluchafight: {
        dialogue: function () {
            const battle = battlePokemon("Hawlucha", "routefour1", "chosenHawlucha");

            this.nextScene = battle.next;

            return battle.text;
        },

        img: "hawlucha.png",
        background: "route3.png",

        next: function () {
            return this.nextScene;
        }
    },

    Hawluchacapture: {

        dialogue: function () {
            const captureResult = catchPokemon("Hawlucha", "routefour1", "chosenHawlucha")

            this.nextScene = captureResult.next;

            return captureResult.text;
        },

        img: "hawlucha.png",
        background: "route3.png",

        next: function () {
            return this.nextScene;
        }
    },
    Hawlucharun: {
        dialogue: `You successfully ran away from Hawlucha...`,
        background: "blackscreen.jpg",
        next: "routefour1",
    },

}




















































// stuff

let currentScene = "intro";


const nameEl = document.getElementById("name");
const dialogueEl = document.getElementById("dialogue");
const bgEl = document.getElementById("background");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const pokemonImgE1 = document.getElementById("img");

function loadScene(sceneKey) {
    const scene = scenes[sceneKey];

    if (scene.options && scene.options[0]?.type) {
        document.documentElement.style.setProperty("--starter-color", "white");
    }

    dialogueEl.textContent =
        typeof scene.dialogue === `function`
            ? scene.dialogue()
            : scene.dialogue;

    bgEl.src = scene.background || "";

    if (scene.img) {
        pokemonImgE1.src = scene.img;
        pokemonImgE1.style.display = "block";
    } else {
        pokemonImgE1.style.display = "none";
    }

    optionsEl.innerHTML = "";

    if (scene.options) {
        nextBtn.style.display = "none";

        scene.options.forEach(option => {
            const btn = document.createElement("button");

            if (option.type) {
                btn.style.backgroundColor = starterThemes[option.type];
            }

            btn.innerHTML = `
            ${option.img ? `<img src="${option.img}" style="width:80px;"><br>` : ""}
            ${option.text}
            `;


            btn.onclick = () => {
                if (option.action) option.action();
                if (option.next) {
                    //removed option.action(); seemed to let you continue after pressing fight.//
                    currentScene = option.next;
                    loadScene(currentScene);
                }
            };
            optionsEl.appendChild(btn);
        });

    } else {
        nextBtn.style.display = "block";
    }
}





nextBtn.onclick = () => {
    const scene = scenes[currentScene];

    const next =
        typeof scene.next === "function"
            ? scene.next()
            : scene.next;

    if (next) {
        currentScene = next;
        loadScene(currentScene);
    }

};


loadScene(currentScene);




//overlay thingy
const overlay = document.getElementById("overlay");
const openInventoryBtn = document.getElementById("openInventory");
const closeInventoryBtn = document.getElementById("overlayBtn");

function openOverlay() {
    overlay.classList.add("active");
}

function closeOverlay() {
    overlay.classList.remove("active");
}

openInventoryBtn.onclick = openOverlay;
closeInventoryBtn.onclick = closeOverlay;

overlay.onclick = (e) => {
    if (e.target === overlay) {
        closeOverlay();
    }
};