const btn = document.getElementById("btn");
const image = document.getElementById("image");

btn.addEventListener("click", () => {
    image.src = "bg2.png";

    const dialogs = document.querySelectorAll("dialouge");
    dialogs[0].closest();
    dialogs[1].showModal();
}); //doesnt work for some reason :(