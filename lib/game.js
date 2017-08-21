require('./style.css');
const { playerEnigma, reversePipe, hangingPipe } = require('./images.js');
const Pipe = require('./Pipe.js');
const Player = require('./Player.js');

const slowBtn = document.getElementById('slow');
const fastBtn = document.getElementById('fast');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

window.addEventListener('keypress', gameAction);
slowBtn.addEventListener('click', () => changeDifficulty('slow', slowBtn, fastBtn));
fastBtn.addEventListener('click', () => changeDifficulty('fast', fastBtn, slowBtn));

const gameStates = ['ready', 'gameOn', 'gameOver'];
let currentGameState = gameStates[0];
let gameMode = 'fast';
let gameScore = 0;

let pipeSeparation;
let pipeSpeed;
let pipeArray = [];

const difficulty = {
  fast: {
    pipeSeparation: 190,
    pipeSpeed: 5,
    pipeGap: 135,
    pipeMinHeight: 150,
  },
  slow: {
    pipeSeparation: 350,
    pipeSpeed: 7,
    pipeGap: 200,
    pipeMinHeight: 100,
  }
};

if (JSON.parse(localStorage.getItem('highScore')) === null) {
  var highScore = {
    slow: 0,
    fast: 0
  };
} else {
  highScore = JSON.parse(localStorage.getItem('highScore'));
}

gameReadyMsg();
displayScore();

const player = new Player();

playerEnigma.onload = () => player.drawImg(c, playerEnigma);
player.draw(c);

function animate() {

  if (currentGameState === 'gameOn') {
    c.clearRect(0, 0, canvas.width, canvas.height);
    updatePipes();
    updatePlayer();
    checkScoreIncrease();
    displayScore();
  }

  requestAnimationFrame(animate);
}

function changeDifficulty(difLevel, btn1, btn2) {
  gameMode = difLevel;
  resetGame();
  displayScore();
  btn1.classList.add('active');
  btn2.classList.remove('active');
}

function checkScoreIncrease() {
  const firstPipe = pipeArray[0];

  if (pipeArray.length > 0
  && player.x > firstPipe.x + firstPipe.width
  && firstPipe.point === true)  {
    gameScore++;
    pipeArray[0].point = false;
    if (gameMode === 'slow' && gameScore > highScore.slow) {
      highScore.slow = gameScore;

    } else if (gameMode === 'fast' && gameScore > highScore.fast) {
      highScore.fast = gameScore;
    }
  }
  setHighScoreLocal();
}

function createNewPipes() {
  let newPipe;
  let diffLevel;

  gameMode === 'slow' ? diffLevel = 'slow' : diffLevel = 'fast';
  newPipe = new Pipe(canvas, difficulty[diffLevel].pipeGap, difficulty[diffLevel].pipeMinHeight);
  pipeSeparation = difficulty[diffLevel].pipeSeparation;
  pipeSpeed = difficulty[diffLevel].pipeSpeed;

  pipeArray.push(newPipe);
}

function displayScore() {
  c.fillStyle = '#000';
  c.font = '20px PressStart2P';
  c.fillText('SCORE: ', 10, 30);
  c.fillText(gameScore, 140, 30);
  c.fillText('HIGHSCORE: ', 10, 60);

  gameMode === 'slow' ? c.fillText(highScore.slow, 220, 60)
                      : c.fillText(highScore.fast, 220, 60);
}

function gameAction(e) {
  if (e.which === 32) {
    if (currentGameState === 'ready') {
      currentGameState = gameStates[1];
    } else if (currentGameState === 'gameOn') {
      player.fly();
      // flap.play();  //  play flap sound
    }
  } else if (e.which === 101) {
    changeDifficulty('slow', slowBtn, fastBtn);
  } else if (e.which === 104) {
    changeDifficulty('fast', fastBtn, slowBtn);
  } else if (currentGameState === 'gameOver' && e.which === 13) {
    resetGame();
  }
}

function gameOver() {
  // hurt.play();  //  play hurt sound
  currentGameState = gameStates[2];
  c.fillStyle = '#000';
  c.font = '48px PressStart2P';
  c.fillText('GAME OVER', (canvas.width / 2) - 300, (canvas.height / 2));
  c.font = '20px PressStart2P';
  c.fillText('(Press Enter to play again)', (canvas.width / 2) - 260, (canvas.height / 2) + 40);
}

function gameReadyMsg() {
  c.fillStyle = '#000';
  c.font = '48px PressStart2P';
  c.fillText('READY', (canvas.width / 2) - 120, (canvas.height / 2));
  c.font = '20px PressStart2P';
  c.fillText('(Press - SPACE - To Fly)', (canvas.width / 2) - 140, (canvas.height / 2) + 40);
}

function resetGame() {
  // start.play(); //  play start sound
  currentGameState = gameStates[0];
  c.clearRect(0, 0, canvas.width, canvas.height);
  pipeArray = [];
  gameScore = 0;
  player.y = 300;
  player.draw(c);
  player.drawImg(c, playerEnigma);
  gameReadyMsg();
  displayScore();
}

function updatePipes() {
  pipeArray.forEach(pipe => {
    pipe.move(pipeSpeed);
    pipe.draw(c, canvas);
    pipe.drawImg(c, reversePipe, hangingPipe);
  });

  pipeArray.forEach(pipe => {
    if (pipe.x + pipe.width < 0) {
      pipeArray.shift();
    }
  });

  const lastPipe = pipeArray[pipeArray.length - 1];

  if (pipeArray.length === 0 || lastPipe.x + lastPipe.width < canvas.width - pipeSeparation) {
    createNewPipes();
  }
}

function updatePlayer() {
  player.fall(canvas);
  player.draw(c);
  player.drawImg(c, playerEnigma);
  if (player.detectColllision(canvas, pipeArray)) {
    gameOver();
  }
}

function setHighScoreLocal() {
  const setHighScore = JSON.stringify(highScore);

  localStorage.setItem('highScore', setHighScore);
}

requestAnimationFrame(animate);
