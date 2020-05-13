window.onload = function() {
    document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            startGame()
        }
    }
    //document.addEventListener('keyup',startGame);//Al pulsar espacio queremos cambiar de escena
    //document.addEventListener('keyup',soundGame);
}

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
