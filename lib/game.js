require('./style.css');
const Pipe = require('./Pipe.js');
const Player = require('./Player.js');
const Background = require('./Background.js');
const Instructions = require('./Instructions.js');
const { playerEnigma, reversePipe,  hangingPipe, canvasBackground } = require('./images.js');

const slowBtn = document.getElementById('slow');
const fastBtn = document.getElementById('fast');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

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
    pipeSpeed: 7,
    pipeGap: 170,
    pipeMinHeight: 150,
  },
  slow: {
    pipeSeparation: 350,
    pipeSpeed: 5,
    pipeGap: 230,
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


const background = new Background();
const player = new Player(110, 300, 150, 25);


canvasBackground.onload = () => background.drawImg(context, canvasBackground);
background.draw(context);



function animate() {
  if (currentGameState === 'gameOn') {
    context.clearRect(0, 0, canvas.width, canvas.height);
    background.animateBackground(context);
    background.backgroundMove();
    updatePipes();
    updatePlayer();
    checkScoreIncrease();
    displayScore();
    collisionDetection();
  }
  requestAnimationFrame(animate);
}

function collisionDetection() {
  if (player.collision === true) {
    return;
  }
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
  context.fillStyle = '#000';
  context.fillText('SCORE: ', 10, 30);
  context.fillText(gameScore, 90, 30);
  context.fillText('HIGHSCORE: ', 10, 60);

  gameMode === 'slow' ? context.fillText(highScore.slow, 140, 60)
                      : context.fillText(highScore.fast, 140, 60);
}

function gameAction(e) {
  if (e.which === 32) {
    if (currentGameState === 'ready') {
      currentGameState = gameStates[1];
    } else if (currentGameState === 'gameOn') {
      player.fly();
      player.gravitySpeed = 0;
    }
  } else if (e.which === 115) {
    changeDifficulty('slow', slowBtn, fastBtn);
  } else if (e.which === 102) {
    changeDifficulty('fast', fastBtn, slowBtn);
  } else if (currentGameState === 'gameOver' && e.which === 13) {
    resetGame();
  }
}

function gameOver() {
  currentGameState = gameStates[2];
  context.fillStyle = '#000';
  context.font = '55px PressStart2P';
  context.fillText('GAME OVER', (canvas.width / 2) - 150, (canvas.height / 2));
  context.fillStyle = ('#3D3B3B');
  context.font = '20px PressStart2P';
  context.fillText('PRESS - ENTER - TO PLAY AGAIN', (canvas.width / 2) - 140, (canvas.height / 2) + 30);
}

function gameReadyMsg() {
  const instructions = new Instructions();

  instructions.drawInstructions(context);
  context.font = '48px PressStart2P';
  context.font = '20px PressStart2P';
}

function resetGame() {
  currentGameState = gameStates[0];
  context.clearRect(0, 0, canvas.width, canvas.height);
  pipeArray = [];
  gameScore = 0;
  player.gravitySpeed = 0;
  player.y = 300;
  player.draw(context);
  player.drawImg(context, playerEnigma);
  gameReadyMsg();
  displayScore();
}

function updatePipes() {
  pipeArray.forEach(pipe => {
    pipe.move(pipeSpeed);
    pipe.draw(context, canvas);
    pipe.drawImg(context, reversePipe, hangingPipe);
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
  player.gravityEffect(canvas);
  player.draw(context);
  player.drawImg(context, playerEnigma);
  if (player.detectCollision(canvas, pipeArray)) {
    gameOver();
  }
}

function setHighScoreLocal() {
  const setHighScore = JSON.stringify(highScore);

  localStorage.setItem('highScore ', setHighScore);
}

requestAnimationFrame(animate);
