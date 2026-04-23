

const gameState = {
    starter: null
};
const scenes = {
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
                action: () => gameState.starter = "Litten",
                next: "chosen"
            },
            {
                text: "Froakie",
                action: () => gameState.starter = "Froakie",
                next: "chosen"
            },
            {
                text: "Treecko",
                action: () => gameState.starter = "Treecko",
                next: "chosen"
            }
        ]
    },
    chosen: {
        text: () => `You chose a ...${gameState.starter}!`,
        background: "bg2.png"
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
        typeof scene.dialogue === "function"
            ? scene.dialogue()
            : scene.dialogue;

    bgEl.src = scene.background || "";


    optionsEl.innerHTML = "";

    if (scene.options) {
        nextBtn.style.display = "none";

        scene.options.forEach(options => {
            const btn = document.createElement("button");
            btn.textContent = options.dialogue;

            btn.onclick = () => {
                if (options.action) options.action();
                currentScene = options.next;
                loadScene(currentScene);
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

