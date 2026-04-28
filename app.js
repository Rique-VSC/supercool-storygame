const starterThemes = {
    fire: "#e74c3c",
    water: "#50caf6",
    grass: "#2ecc71",
    electric: "#ebd540",
    ground: "#876414",
    flying: "d8fff8",
    dark: "#5a4a69",
    psychic: "#b98ee0",
    fairy: "#ffe0fd",
    dragon: "#4f82bc",
    normal: "#c9c9c9",
    fighting: "#e9a125"
};
 
function setStarterTheme(pokemonName) {
    const color = starterThemes[pokemonName] || "white";
    document.documentElement.style.setProperty("--starter-color", color);
}

const gameState = {
    starter: null
};


function fiftyfifty() {
    let result = 'lost';
    if (Math.random() < .5 )  {
        result = 'won';
    }
    return result;
}

function capture() {
    let result = 'failed to capture';
    if (Math.random() < .5 )  {
        result = 'caught';
    }
    return result;
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
        dialogue: "Today is the day you get to go out on your Pokemon journey in the CART region! This is your town, [CART lab], and today is the day you leave to adventure!",
        background: "bg1.png",
        next: "intro2"
    },

    intro2: {
        dialogue: "You make your way towards the laboratory, where you meet Professor [teacher name]. They will let you pick your very first Pokemon.",
        background: "bg2.png",
        next: "intro3"
    },

    intro3: {
        dialogue: "You also meet your classmate [student] at the lab, who is also starting their Pokemon journey as well. [student] insists you go first to choose your partner.",
        background: "bg2.png",
        next: "starterOption"
    },

    starterOption: {
        dialogue: "Who would you like to join you on your journey?",
        background: "bg2.png",
        options: [
            {
                text: "Litten",
                img: "litten.png",
                action: () => {
                    gameState.starter = "Litten";
                    setStarterTheme("fire");
                },
                next: "chosenStarter"
            },
            {
                text: "Froakie",
                img: "froakie.png",
                action: () => {
                    gameState.starter = "Froakie";
                    setStarterTheme("water");
                },
                next: "chosenStarter"
            },
            {
                text: "Treecko",
                img: "treecko.png",
                action: () => {
                    gameState.starter = "Treecko";
                    setStarterTheme("grass");
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
        dialogue: () => `You picked ${gameState.starter}! After your pick, [student name] picks theirs and you both go on your separate ways.`,
        background: "bg2.png",
        next: "routeOne1"
    },
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
                action: () => {
                    gameState.starter = "Wynaut";
                    setStarterTheme("psychic");
                },
                next: "chosenWynaut"
            },
            {
                text: "Ground",
                action: () => {
                    gameState.starter = "Cubone";
                    setStarterTheme("ground");
                },
                next: "chosenCubone"
            },
            {
                text: "Normal",
                action: () => {
                    gameState.starter = "Munchlax";
                    setStarterTheme("normal");
                },
                next: "chosenMunchlax"
            }
        ]
    },

    //wynaut option
    chosenWynaut: {
        dialogue: "A wild Wynaut has appeared! What will you do?",
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
        background: "route1.png",
        next: "Wynautfight",   
    },
    


    catchWynaut: {
        dialogue: `You chose to catch ...Wynaut!`,
        background: "route1.png",
        next: "Wynautcapture",
    },

    runFromWynaut: {
        dialogue: `You attempted to flee from ...Wynaut!`,
        background: "route1.png",
        next: "RunawayWynaut",
    },


    Wynautfight: {

        dialogue: `You ${fiftyfifty()} against Wynaut!`,
        background: "route1.png",
    },
    
    Wynautcapture: {

        dialogue: `You ${capture()} Wynaut!`,
        background: "route1.png",
    },

    RunawayWynaut: {
        dialogue: `You successfully ran away from Wynaut...`,
        background: "blackscreen.jpg",
    },


    // cubone option
    chosenCubone: {
        dialogue: "A wild Cubone has appeared! What will you do?",
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
        background: "route1.png",
        next: "Cubonefight"
    },
    catchCubone: {
        dialogue: `You chose to catch ...Cubone!`,
        background: "route1.png",
        next: "Cubonecapture",
    },
    runFromCubone: {
        dialogue: `You attempted to flee from ...Cubone!`,
        background: "route1.png",
        next: "Cubonerun",
    },

    Cubonefight: {
        dialogue: `You ${fiftyfifty()} against Cubone!`,
        background: "route1.png", 
    },

    Cubonecapture: {

        dialogue: `You ${capture()} Cubone!`,
        background: "route1.png", 
    },

    Cubonerun: {
        
        dialogue: `You successfully ran away from Cubone...`,
        background: "blackscreen.jpg",

    },

    // munchlax option
    chosenMunchlax: {
        dialogue: "A wild Munchlax has appeared! What will you do?",
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
        background: "route1.png",
        next: "Munchlaxfight"
    },
    catchMunchlax: {
        dialogue: `You chose to catch ...Munchlax!`,
        background: "route1.png",
        next: "CatchMunchlax",
    },
    runFromMunchlax: {
        dialogue: `You attempted to flee from ...Munchlax!`,
        background: "route1.png",
        next: "Munchlaxrun",
    },


Munchlaxfight:{
    dialogue: `You ${fiftyfifty()} against Munchlax!`,
        background: "route1.png", 
},

CatchMunchlax:{
    dialogue: `You ${capture()} Munchlax!`,
        background: "route1.png", 
},
Munchlaxrun:{ 
dialogue: `You successfully ran away from Munchlax...`,
        background: "blackscreen.jpg",
    }


}














// stuff

let currentScene = "intro";


const nameEl = document.getElementById("name");
const dialogueEl = document.getElementById("dialogue");
const bgEl = document.getElementById("background");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

function loadScene(sceneKey) {
    const scene = scenes[sceneKey];

    dialogueEl.textContent =
        typeof scene.dialogue === `function`
            ? scene.dialogue()
            : scene.dialogue;

    bgEl.src = scene.background || "";


    optionsEl.innerHTML = "";

    if (scene.options) {
        nextBtn.style.display = "none";

        scene.options.forEach(option => {
            const btn = document.createElement("button");
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
    const next = scenes[currentScene].next;
    if (next) {
        currentScene = next;
        loadScene(currentScene);
    }
};

loadScene(currentScene);





// inventory function.... doesnt wporkm right now
// document.addEventListener("DOMContentLoaded", () => {
//     const overlay = document.getElementById("overlay");
//     const showBtn = document.getElementById("showOverlay");
//     const closeBtn = document.getElementById("closeOverlay");

//     showBtn.addEventListener("click", () => {
//     });
//     closeBtn.addEventListener("click", () => {
//         inventory.classList.add = "hidden";
//     });
    
// });



