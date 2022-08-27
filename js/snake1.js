// game variable

let direction = { x: 0, y: 0 };
const foodSound = new Audio("../music1/food.mp3");
const gameOverSound = new Audio("../music1/gameover.mp3");
const moveSound = new Audio("../music1/move.mp3");
const musicSound = new Audio("../music1/Music.mp3");
let speed = 6;
let lastPaintTime = 0;
let snakeArr = [{ x: 10, y: 15 }];
let gameOver;

let food = { x: 4, y: 9 };
let score = 0;

// game function

function main(ctime) {
  musicSound.play();
  window.requestAnimationFrame(main);
  //console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;

  gameEngine();
}
function IsCollide(snake) {
  // If you bump into yourself

  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  //If you bump into wall
  if (
    snake[0].x >= 26 ||
    snake[0].x <= 0 ||
    snake[0].y >= 26 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  //Part 1 : Update Snake and Food
  if (IsCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    alert("GAME OVER. PRESS ANY KEY TO START");

    direction = { x: 0, y: 0 };
    score = 0;
    scoreBar.innerHTML = "Score : " + score;
    highScore.innerHTML = "High Score : " + hiscoreval;
    snakeArr = [{ x: 10, y: 15 }];
    musicSound.play();
  }

  //Part 2 : Display the Snake and Food
  //display Snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;

    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //If Snake eaten the food ,increment the score,Snake and regenerate the food
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiScore.innerHTML = "High Score : " + hiscoreval;
    }
    scoreBar.innerHTML = "Score : " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + direction.x,
      y: snakeArr[0].y + direction.y,
    });
    let a = 1;
    let b = 17;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Move the Snake

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += direction.x;
  snakeArr[0].y += direction.y;

  //Display Food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;

  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
// Logic code start here

let hiScore = localStorage.getItem("hiscore");
if (hiScore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiScore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiScore);
  highScore.innerHTML = "High Score : " + hiscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  direction = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      direction.x = 0;
      direction.y = -1;
      break;
    case "ArrowDown":
      console.log("Arrowdown");
      direction.x = 0;
      direction.y = 1;
      break;
    case "ArrowLeft":
      console.log("Arrowleft");
      direction.x = -1;
      direction.y = 0;
      break;
    case "ArrowRight":
      console.log("Arrowright");
      direction.x = 1;
      direction.y = 0;
      break;

    default:
      break;
  }
});
