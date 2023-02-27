const gameContainer = document.getElementById("game");
let pick1 = null;
let pick2 = null;
let picksFlipped = 0;
let noClicking = false;

const COLORS = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple"
];

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
   return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(color);
        newDiv.addEventListener("click", handleCardClick);
        gameContainer.append(newDiv);
    }
}

function handleCardClick(e) {
    if (noClicking) return;
    if (e.target.classList.contains("flipped")) return;

    let currentCard = e.target;
    currentCard.style.backgroundColor = currentCard.classList[0];

    if (!pick1 || !pick2) {
        currentCard.classList.add("flipped");
        pick1 = pick1 || currentCard;
        pick2 = currentCard === pick1 ? null : currentCard;
    }

    if (pick1 && pick2) {
        noClicking = true;
        
        if (pick1 === pick2) {
            picksFlipped += 2;
            pick1.removeEventListener("click", handleCardClick);
            pick2.removeEventListener("click", handleCardClick);
            pick1 = null;
            pick2 = null;
            noClicking = false;
        } else {
            setTimeout(function () {
                pick1.style.backgroundColor = "";
                pick2.style.backgroundColor = "";
                pick1.classList.remove("flipped");
                pick2.classList.remove("flipped");
                pick1 = null;
                pick2 = null;
                noClicking = false;
            }, 1000);
        }
    }

    if (picksFlipped === COLORS.length) alert("game over!");
}

