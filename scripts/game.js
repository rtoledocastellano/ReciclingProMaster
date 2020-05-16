//1 - Papper; 2- Plastic; 3-Organic; 4-Cristal
function ReciclingProMaster() {
  var self = this;
  this.points = 0;
  this.timeLeft = 30.00;
  this.binType = ['papper', 'plastic', 'organic', 'cristal'];
  this.images = [['./assets/images/paper.png', './assets/images/paper2.png'],
  ['./assets/images/plastic1.png', './assets/images/plastic2.png', './assets/images/plastic3.png'],
  ['./assets/images/organic1.png', './assets/images/organic2.png', './assets/images/organic3.png'],
  ['./assets/images/glass1.png']];
  this.audio = [new Audio('./assets/sounds/correct.wav'), new Audio('./assets/sounds/wrong.wav')]
  this.audio.volume = 0.2;

  this.random = function (num, offset = 1) {
    return Math.floor(Math.random() * num + offset);
  }

  this.changeCube = function () {
    let cube = document.getElementById("cube");
    let currentRubish = cube.getAttribute('value');
    let rubishType = self.random(4);
    //Add the condition to be sure that the cube changes
    while (parseInt(currentRubish) === rubishType) {
      rubishType = self.random(4);
    }
    cube.removeAttribute('class'); //Remove the current binClass
    cube.setAttribute('value', `${rubishType}`); //Set the fixed value of the bin
    cube.setAttribute('class', `cube-${self.binType[rubishType - 1]}`) //Add the class
  }

  this.generateRubish = function () {
    let parent = document.getElementById('canvas');
    let firstChild = document.getElementById('cube');
    let rubish = document.createElement('div');
    let rubishType = self.random(4);
    rubish.setAttribute('value', `${rubishType}`);
    rubish.setAttribute('class', `rubish-${self.binType[rubishType - 1]}`)
    let imageUrl = self.images[rubishType - 1][self.random(self.images[rubishType - 1].length) - 1];
    rubish.style.backgroundImage = `url(${imageUrl})`;
    let pos = self.setRubbishPosition();

    parent.insertBefore(rubish, firstChild);

    rubish.style.top = pos[1] + 'px';
    rubish.style.left = pos[0] + 'px';
    self.rubishStatus();
  }

  // Generation of random position in the canvas
  this.setRubbishPosition = function () {
    do {
      var left = self.random(1000, 100);
      var top = self.random(350, 80);
    } while (self.checkBoard(left, top))

    return [left, top];
  }

  //Checks the current position of rubish on the board
  this.checkBoard = function (x, y) {
    let rubish = document.querySelectorAll("[class*=rubish]");
    for (let i = 0; i < rubish.length; i++) {
      let x2 = parseInt(rubish[i].style.left.slice(0, -2));
      let y2 = parseInt(rubish[i].style.top.slice(0, -2));
      if (x < x2 + 60 && x + 60 > x2 && y < y2 + 60 && 60 + y > y2) {
        return true;
      }
    }
    return false;
  }
  //Checks of the clicked element is correct
  this.checkCorrect = function (e) {
    let correct = -1;
    let rubish = e.currentTarget;
    let cube = document.getElementById('cube');
    if (rubish.getAttribute('value') === cube.getAttribute('value')) {
      correct = 1;
    }
    self.points += (correct * 5);
    self.removeItem(e);
    self.updatePoints();
    self.playAudio(correct);
  }
  //This function deletes from the board the clicked element
  this.removeItem = function (e) { 
    let item = e.currentTarget;
    item.classList.add('hidden');
    setTimeout(function() {
      item.parentNode.removeChild(item)
    }, 1500);
  }
  //Gets the result from the clicked element and sounds in consequence
  this.playAudio = function (num) {
    self.audio[num === -1 ? 1 : 0].play();
  }
  //Add EventListeners to rubish on the board
  this.rubishStatus = function () {
    let rubish = document.querySelectorAll("[class*=rubish]")
    for (var i = 0; i < rubish.length; i++) {
      rubish[i].addEventListener('click', self.checkCorrect);
    }
  }
  //Updates the score in the screen
  this.updatePoints = function () {
    let score = document.getElementById('score');
    score.innerHTML = `${self.points} <i class="fas fa-globe-europe"></i>`;
  }
  //Function to Inicialize and Finish the Game
  this.init = function () {
    this.downloadTimer = setInterval(this.gameClock.bind(this), 10);
    this.differentCube = setInterval(this.changeCube.bind(this), 3000);
    this.rubishAddition = setInterval(this.generateRubish.bind(this), 1500);
  }
  this.gameClock = function () {
    if (self.timeLeft <= 0) {
      clearInterval(this.downloadTimer);
      clearInterval(this.differentCube);
      clearInterval(this.rubishAddition);
      document.getElementById('timer').innerHTML = '<i class="fas fa-clock"></i>  0.00';
      endGame(self.points);
    }
    else {
      self.timeLeft -= 0.01;
      document.getElementById('timer').innerHTML = `<i class="fas fa-clock"></i>  ${self.timeLeft.toFixed(2)}`;
    }
  }
}

