//1 - Papper; 2- Plastic; 3-Organic; 4-Cristal
function random() {
  return Math.floor(Math.random() * 4 + 1);
}

setInterval(changeRubish, 5000);
setInterval(generateRubish, 3000);


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
        }
        else {
            self.timeLeft -= 0.01;
            document.getElementById('timer').innerHTML = `<i class="fas fa-clock"></i>  ${self.timeLeft.toFixed(2)}`;
        }
    },10);
        var differentCube = setInterval(this.changeCube,2000);
        var rubishAddition = setInterval(this.generateRubish,1000);
    }
}
