let gameseq = [];
let userseq = [];
let started = false;
let level = 0;
let highScore = 0;
const btns = ["red", "green", "blue", "orange"];

const h3 = document.querySelector("h3");
const highScoreDisplay = document.getElementById("high-score");

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        level = 0;
        gameseq = [];
        levelUp();
    }
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

function levelUp() {
    userseq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let ranInx = Math.floor(Math.random() * 4); // fixed to 4
    let rancolor = btns[ranInx];
    let ranbtn = document.querySelector(`.${rancolor}`);
    gameseq.push(rancolor);
    btnflash(ranbtn);
}

const allbtn = document.querySelectorAll(".btn");
allbtn.forEach(btn => btn.addEventListener("click", btnpress));

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        gameOver();
    }
}

function btnpress() {
    if (!started) return;
    const btn = this;
    const userColor = btn.getAttribute("id");

    btnflash(btn);
    userseq.push(userColor);
    checkAns(userseq.length - 1);
}

function gameOver() {
    document.body.classList.add("game-over");
    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 150);

    if (level > highScore) {
        highScore = level;
        highScoreDisplay.innerText = `Highest Score: ${highScore}`;
    }

    h3.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to restart.`;
    reset();
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
