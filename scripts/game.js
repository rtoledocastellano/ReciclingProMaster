//Function from 1 to 4 to set the type of waste
//1 - Papper; 2- Plastic; 3-Organic; 4-Cristal

//#canvas>div[class*=cube]

function ReciclingProMaster() {
var self = this;
this.points = 0;
this.timeLeft = 30.00;
this.downloadTimer;
this.binType = ['papper','plastic','organic','cristal'];

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
    let rubishType = self.random(4); //Generate new binType
    rubish.setAttribute('value',`${rubishType}`); //Add the fixed value
    rubish.setAttribute('class',`rubish-${self.binType[rubishType-1]}`) //Add the class
  
    parent.insertBefore(rubish,firstChild); //All the elements will be inserted before the cube
    let top = self.random(350) + 80;
    let left = self.random(1000) + 100; //Generation of random position in the canvas
    rubish.style.top = top + 'px';
    rubish.style.left = left + 'px'; //Draw it on the canvas
    self.activateRubish(); //This functions active the eventListeners
}

this.removeItem = function(e) { //Remove the items once It are clicked
    let item = e.currentTarget;
    item.parentNode.removeChild(item);
}


this.checkCorrect = function(e){
    let correct = 1;
    let rubish = e.currentTarget;
    let cube = document.getElementById('cube');
    console.log(rubish.getAttribute('value'));
    console.log(cube.getAttribute('value'));
       if(rubish.getAttribute('value') === cube.getAttribute('value')) {
            self.points += 5;
        }
        else {
            self.points -= 5;
        }
    self.removeItem(e); 
    self.updatePoints();
}

this.activateRubish = function(){
    let rubish = document.querySelectorAll("[class*=rubish]")
    for (var i= 0; i<rubish.length;i++) {
    rubish[i].addEventListener('click',self.checkCorrect);
    }
}

this.desactivateRubish = function() { //juntar a la funcion activateRubish
    let rubish = document.querySelectorAll(".rubish-cristal,.rubish-organic,.rubish-plastic,.rubish-papper");
    for (var i= 0; i<rubish.length;i++) {
    rubish[i].removeEventListener('click',self.checkCorrect);
    }
}

this.updatePoints = function() {
    let score = document.getElementById('score');
    score.innerHTML = `${self.points} points`;
}

downloadTimer = setInterval(function(){
    if (self.timeLeft <= 0) {
        clearInterval(downloadTimer);
        clearInterval(self.trial1);
        clearInterval(self.trial2);
        document.getElementById('timer').innerHTML = '0.00';
        self.desactivateRubish();
    }
    else {
        self.timeLeft -= 0.01;
        document.getElementById('timer').innerHTML = `${self.timeLeft.toFixed(2)}`;
    }
},10);
this.trial1 = setInterval(this.changeCube,2000);
this.trial2 = setInterval(this.generateRubish,1000);

}

