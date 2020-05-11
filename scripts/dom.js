window.onload = function() {
    document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            startGame()
        }
    }
    //document.addEventListener('keyup',startGame);//Al pulsar espacio queremos cambiar de escena
    //document.addEventListener('keyup',soundGame);
}

//window.prompt("Please insert the number of players");
var game;

function startGame() {
    var parent = document.getElementById('canvas');
    var intro = document.getElementById('intro');
            
    var cube = document.createElement('div');
    cube.setAttribute('id','cube');
    cube.setAttribute('class','cube-papper');
    cube.setAttribute('value','1');
            
    var timer = document.createElement('div');
    timer.setAttribute('id','timer');
            
    var score = document.createElement('div');
    score.setAttribute('id','score');
    score.innerHTML = '0 <i class="fas fa-globe-europe"></i>';
    
    parent.removeChild(intro); //Eliminamos la intro del juego
    
    parent.appendChild(timer);
    parent.appendChild(score);
    parent.appendChild(cube);
    
    
    game = new ReciclingProMaster (); 
    game.init();

    if (game.timeLeft <= 0) {
        endGame(game.points);
    }
}

function endGame(num){
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
    score.setAttribute('id','puntuation');
    score.innerHTML = "Gretta Thunder is not so happy"

    parent.appendChild(score);
}