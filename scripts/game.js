//1 - Papper; 2- Plastic; 3-Organic; 4-Cristal
function ReciclingProMaster() {
    var self = this;
    this.points = 0;
    this.timeLeft = 30.00;
    this.binType = ['papper','plastic','organic','cristal'];
    this.images = [['./assets/images/paper.png','./assets/images/paper2.png'],
    ['./assets/images/plastic1.png','./assets/images/plastic2.png','./assets/images/plastic3.png'],
    ['./assets/images/organic1.png','./assets/images/organic2.png','./assets/images/organic3.png'],
    ['./assets/images/glass1.png']];
    this.audio = [new Audio('./assets/sounds/correct.wav'),new Audio('./assets/sounds/wrong.wav')]

    this.random = function(num, offset = 1) {
        return Math.floor(Math.random()*num + offset);
    }

    this.changeCube = function() {
        let cube = document.getElementById("cube"); //Select the element in the DOM
        let currentRubish = cube.getAttribute('value');
        let rubishType = self.random(4); //Create a new binType
        //Add the condition to be sure that the cube changes
        while (parseInt(currentRubish) === rubishType) { 
            rubishType = self.random(4);
        }
        cube.removeAttribute('class'); //Remove the current binClass
        cube.setAttribute('value',`${rubishType}`); //Set the fixed value of the bin
        cube.setAttribute('class',`cube-${self.binType[rubishType-1]}`) //Add the class
    }

    this.generateRubish = function() {
        let parent = document.getElementById('canvas'); //Select the parentNode
        let firstChild = document.getElementById('cube'); //Select firstChild
        let rubish = document.createElement('div'); //Create the rubish
        let rubishType = self.random(4); //Generate new binType from 1 to 4
        rubish.setAttribute('value',`${rubishType}`); //Add the fixed value
        rubish.setAttribute('class',`rubish-${self.binType[rubishType-1]}`) //Add the class 
        rubish.style.backgroundImage = "url("+self.images[rubishType-1][self.random(self.images[rubishType-1].length) - 1]+")";
        let pos = self.setRubbishPosition();
        
        parent.insertBefore(rubish,firstChild); //All the elements will be inserted before the cube
        
        rubish.style.top = pos[1] + 'px';
        rubish.style.left = pos[0] + 'px'; //Draw it on the canvas
        self.rubishStatus(); //This functions active the eventListeners
    }

    this.setRubbishPosition = function () { //Generation of random position in the canvas
        let left = self.random(1000,100);
        let top = self.random(350,80);
        if (self.checkBoard(left,top) === true) { //Checks if the new element is close to an existing one
            self.setRubbishPosition();
        }
        return [left,top];
    }
    //Wrong conditions on this function:
    this.checkBoard = function (h,v) { 
        let rubish = document.querySelectorAll("[class*=rubish]");
        let exist = false;
        //var size = 60;
        //var corner = [[h,v],[h+size,v],[h+size,v-size],[h,v-size]]
        for (let i = 0; i < rubish.length; i++) {
            let x = parseInt(rubish[i].style.left.slice(0,-2));
            let y = parseInt(rubish[i].style.top.slice(0,-2));
            if (x<h && h<x+60 && y-60<v && v<y){ //Checks if the first corner is in the middle of the existing square
                exist = true;
            }
            if (x<(h+60) && (h+60)<(x+60) && (y<v && v<y)){ //Checks if the second corner is in the middle of the existing square
                exist = true;
            }/*
            if (x<h+60 && h+60<x+60 && y-60<v-60 && v-60<y){ //Checks if the third corner is in the middle of the existing square
                exist = true;
            }
            if (x<h && h<x+60 && y-60<v-60 && v-60<y){ //Checks if the third corner is in the middle of the existing square
                exist = true;
            }*/
        } return exist;
    }
    //Checks of the clicked element is correct
    this.checkCorrect = function(e){
        let correct = -1;
        let rubish = e.currentTarget;
        let cube = document.getElementById('cube');
            if(rubish.getAttribute('value') === cube.getAttribute('value')) {
                correct = 1;
            }
        self.points += (correct*5);
        self.removeItem(e); //Remove the clicked item
        self.updatePoints(); //Update the score on screen
        self.playAudio(correct);
    }
    //This function deletes from the board the clicked element
    this.removeItem = function(e) { //Remove the items once It are clicked
        let item = e.currentTarget;
        item.parentNode.removeChild(item);
    }
    //Gets the result from the clicked element and sounds in consequence
    this.playAudio = function(num) {
        self.audio[num === -1 ? 1 : 0].play();
    }
    //Add EventListeners to rubish on the board
    this.rubishStatus = function(){
        let rubish = document.querySelectorAll("[class*=rubish]")
        for (var i= 0; i<rubish.length;i++) {
            rubish[i].addEventListener('click',self.checkCorrect);
        }
    }
    //Updates the score in the screen
    this.updatePoints = function() {
        let score = document.getElementById('score');
        score.innerHTML = `${self.points} <i class="fas fa-globe-europe"></i>`;
    }
    //Function to Inicialize and Finish the Game
    this.init = function() {
        var downloadTimer = setInterval(function(){
        if (self.timeLeft <= 0) {
            clearInterval(downloadTimer);
            clearInterval(differentCube);
            clearInterval(rubishAddition);
            document.getElementById('timer').innerHTML = '<i class="fas fa-clock"></i>  0.00';
            endGame(self.points);
        }
        else {
            self.timeLeft -= 0.01;
            document.getElementById('timer').innerHTML = `<i class="fas fa-clock"></i>  ${self.timeLeft.toFixed(2)}`;
        }
    },10);
        var differentCube = setInterval(this.changeCube,3000);
        var rubishAddition = setInterval(this.generateRubish,1500);
    }
}

