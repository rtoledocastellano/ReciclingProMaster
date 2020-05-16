window.onload = function () {
  checkAudio();
  document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
      startGame();
    }
  } 
}

//var playerNames = playerNumber();
//var numOfPlayers = playerNames.length;
var soundOn = false;
var song = new Audio('./assets/sounds/game.mp3');



function playerNumber() {
  let numPlayer = window.prompt("Introduzca el número de jugadores");
  while ((typeof (numPlayer) != 'string') || (numPlayer > 4)) {
    numPlayer = window.prompt("Por favor inserte un número entre 1 y 4");
  };
  numPlayer = parseInt(numPlayer);
  let names = askNames(numPlayer);
  return names;
}

function askNames(num) {
  let names = [];
  for (let i = 0; i <= num - 1; i++) {
    names[i] = window.prompt(`Introduzca el nombre del jugador ${i + 1}`);
  }
  return names;
}
//This function deletes the intro and insert the elements to the DOM to Play
function startGame() {
  //Get the existing elements on the DOM
  var parent = document.getElementById('canvas');
  var intro = document.getElementById('intro');

  //Create the needed elementes and set the Attributes
  var cube = document.createElement('div');
  cube.setAttribute('id', 'cube');
  cube.setAttribute('class', 'cube-papper');
  cube.setAttribute('value', '1');

  var timer = document.createElement('div');
  timer.setAttribute('id', 'timer');

  var score = document.createElement('div');
  score.setAttribute('id', 'score');
  score.innerHTML = '0 <i class="fas fa-globe-europe"></i>';

  //Delete the intro from the DOM
  parent.removeChild(intro);

  //Insert the elementes to the DOM
  parent.appendChild(timer);
  parent.appendChild(score);
  parent.appendChild(cube);


  game = new ReciclingProMaster();
  game.init();
}
//This function change the DOM between game and game
function reStartGame() {
  let parent = document.getElementById('canvas');

  //Deleting elements not needed
  let scoring = document.getElementById('score');
  parent.removeChild(scoring);
  let puntuation = document.querySelectorAll("[class*=puntuation]")
  for (let i = 0; i < puntuation.length; i++) {
    parent.removeChild(puntuation[i]);
  }

  //Inserting needed elements to play
  let intro = document.createElement('div');
  intro.setAttribute('id', 'intro');
  parent.appendChild(intro);

  document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
      startGame()
    }
  }
}
//Function to finish the game and show your score with a friendly message
function endGame(points) {
  let rubish = document.querySelectorAll("[class*=rubish]");
  let parent = document.getElementById('canvas');

  //Remove all the waste that is on the screen
  for (let i = 0; i < rubish.length; i++) {
    parent.removeChild(rubish[i]);
  }
  //Remove the cube
  parent.removeChild(document.getElementById('cube'));

  //create a new div to insert the score
  let finalScore = document.createElement('div');
  checkResult(finalScore, points);
  parent.appendChild(finalScore);

  document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
      reStartGame()
    }
  }
}
//This function checks the score and return you a message
function checkResult(elem, points) {
  elem.innerHTML = `${points} <i class="fas fa-globe-europe"></i>`;
  elem.setAttribute('class', 'puntuation4');
  const punt = [20, 40, 60, 80];
  for (var k = 3; k >= 0; k--) {
    if (points < punt[k]) {
      elem.setAttribute('class', `puntuation${k}`);
    }
  }
}

function checkAudio() {
  switch (soundOn) {
    case true:
      song.pause();
      break;
    case false:
      song.play();
      song.volume = 0.3;
      song.loop = true;
      break;
  }
  !soundOn;
}