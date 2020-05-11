//1 - Papper; 2- Plastic; 3-Organic; 4-Cristal
function ReciclingProMaster() {
    var self = this;
    this.points = 0;
    this.timeLeft = 30.00;
    //this.downloadTimer;
    this.binType = ['papper','plastic','organic','cristal'];
    this.images = [['/assets/images/paper.png','/assets/images/paper2.png'],
    ['/assets/images/plastic1.png','/assets/images/plastic2.png','/assets/images/plastic3.png'],
    ['assets/images/organic1.png','assets/images/organic2.png','assets/images/organic3.png'],
    ['assets/images/glass1.png']];
    this.audio = [new Audio('/assets/sounds/correct.wav'),new Audio('/assets/sounds/wrong.wav')]

    this.random = function(num) {
        return Math.floor(Math.random()*num + 1);
    }

    this.changeCube = function() {
        var cube = document.getElementById("cube"); //Select the element in the DOM
        var rubishType = self.random(4); //Create a new binType
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
  
        parent.insertBefore(rubish,firstChild); //All the elements will be inserted before the cube
        let top = self.random(400) + 80;
        let left = self.random(1000) + 100; //Generation of random position in the canvas
        rubish.style.top = top + 'px';
        rubish.style.left = left + 'px'; //Draw it on the canvas
        self.rubishStatus('able'); //This functions active the eventListeners
    }

    this.removeItem = function(e) { //Remove the items once It are clicked
        let item = e.currentTarget;
        item.parentNode.removeChild(item);
    }


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

    this.playAudio = function(num) {
        switch (num) {
            case 1:
                self.audio[0].play();
                break;
            case -1:
                self.audio[1].play();
                break;
        }
    }

    this.rubishStatus = function(action){
        let rubish = document.querySelectorAll("[class*=rubish]")
        if (action === 'able'){
            for (var i= 0; i<rubish.length;i++) {
            rubish[i].addEventListener('click',self.checkCorrect);
            }
        }
        if (action === 'disable'){
            for (var i= 0; i<rubish.length;i++) {
            rubish[i].removeEventListener('click',self.checkCorrect);
            }
        }
    }

    this.updatePoints = function() {
        let score = document.getElementById('score');
        score.innerHTML = `${self.points} <i class="fas fa-globe-europe"></i>`;
    }

    this.init = function() {
        var downloadTimer = setInterval(function(){
        if (self.timeLeft <= 0) {
            clearInterval(downloadTimer);
            clearInterval(differentCube);
            clearInterval(rubishAddition);
            document.getElementById('timer').innerHTML = '<i class="fas fa-clock"></i>  0.00';
            self.rubishStatus('disable');
            self.endGame(self.points);
        }
        else {
            self.timeLeft -= 0.01;
            document.getElementById('timer').innerHTML = `<i class="fas fa-clock"></i>  ${self.timeLeft.toFixed(2)}`;
        }
    },10);
        var differentCube = setInterval(this.changeCube,4000);
        var rubishAddition = setInterval(this.generateRubish,1500);
        
        
    }

    this.endGame = function (){
        var rubish = document.querySelectorAll("[class*=rubish]");
        var cube = document.getElementById('cube');
        var parent = document.getElementById('canvas');
    
        //Remove all the waste that is on the screen
        for (var i=0; i < rubish.length; i++) {
            parent.removeChild(rubish[i]);
        }
    
        //Remove the cube
        parent.removeChild(cube);
    
        //create a new div to insert
        var score = document.createElement('div');
        
        if (self.points >= 60) {
            score.setAttribute('id','puntuation');
            score.innerHTML = "Gretta is always angry but she likes you"
        }

        if (self.points < 60) {
            score.setAttribute('id','puntuation');
            score.innerHTML = "There is hope at all"
        }

        if (self.points < 40) {
            score.setAttribute('id','puntuation');
            score.innerHTML = "You are an awesome PlanetKiller"
        }
        
        if (self.points < 20) {
            score.setAttribute('id','puntuation');
            score.innerHTML = "Advice: avoid to be near Greta"
        }
        
        if (self.points < 0) {
        score.setAttribute('id','puntuation');
        score.innerHTML = "You're the next Trump"
        }
        
        parent.appendChild(score);
    }

}
