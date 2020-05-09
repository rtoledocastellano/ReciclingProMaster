//Function from 1 to 4 to set the type of waste
//1 - Papper; 2- Plastic; 3-Organic; 4-Cristal
/*function random (num) {
return Math.floor(Math.random()*num + 1);
}*/

//#canvas>div[class*=cube]

function ReciclingProMaster() {
var self = this;
this.points = 0;
this.timeLeft = 10.00;
this.downloadTimer;

this.random = function(num) {
    return Math.floor(Math.random()*num + 1);
}

this.changeCube = function() {
    var cube = document.getElementById("cube");
    var rubishType = self.random(4);
    cube.removeAttribute('class');
    cube.setAttribute('value',`${rubishType}`);
    switch(rubishType) {
        case 1:
            cube.setAttribute('class','cube-papper');
            break;
        case 2:
            cube.setAttribute('class','cube-plastic');
            break;
        case 3:
            cube.setAttribute('class','cube-organic');
            break;
        case 4:
            cube.setAttribute('class','cube-cristal');
            break;
    }
}

this.generateRubish = function() {
    let parent = document.getElementById('canvas');
    let firstChild = document.getElementById('cube');
    let rubish = document.createElement('div');
    let rubishType = self.random(4);
    rubish.setAttribute('value',`${rubishType}`);
    switch(rubishType) {
        case 1:
            rubish.setAttribute('class','rubish-papper');
            break;
        case 2:
            rubish.setAttribute('class','rubish-plastic');
            break;
        case 3:
            rubish.setAttribute('class','rubish-organic');
            break;
        case 4:
            rubish.setAttribute('class','rubish-cristal');
            break;
    }    
    parent.insertBefore(rubish,firstChild);
    let top = self.random(350) + 80;
    let left = self.random(1000) + 100;
    rubish.style.top = top + 'px';
    rubish.style.left = left + 'px';
    self.activateRubish();
}

this.removeItem = function(e) {
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
this.trial1 = setInterval(this.changeCube,5000);
this.trial2 = setInterval(this.generateRubish,1000);

}

var game = new ReciclingProMaster;
