window.onload = function() {
    document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            startGame()
        }
    }
    //document.addEventListener('keyup',startGame);//Al pulsar espacio queremos cambiar de escena
    //document.addEventListener('keyup',soundGame);
}

playerNumber();
function playerNumber() {
    var numPlayer = window.prompt("Introduzca el número de jugadores");
    while ((typeof(numPlayer) != 'string') || (numPlayer > 4)) {
        numPlayer = window.prompt("Por favor inserte un número entre 1 y 4");
    };
    numPlayer = parseInt(numPlayer);
    var names = askNames(numPlayer);
    return names;
}

function askNames(num){
    var names = [];
    for (let i = 0; i <= num - 1; i++) {
        names[i] = window.prompt(`Introduzca el nombre del jugador ${i+1}`);
    }
    return names;
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
}

function endGame (points){
    var rubish = document.querySelectorAll("[class*=rubish]");
    var cube = document.getElementById('cube');
    var parent = document.getElementById('canvas');

    //Remove all the waste that is on the screen
    for (var i=0; i < rubish.length; i++) {
        parent.removeChild(rubish[i]);
    }

    //Remove the cube
    parent.removeChild(cube);

    //create a new div to insert the score
    var finalScore = document.createElement('div');
    checkResult(finalScore,points);
    parent.appendChild(result);
}

function checkResult (elem, points) {
    elem.innerHTML = `${points} <i class="fas fa-globe-europe"></i>`;
    
    if (points >= 60) {
        score.setAttribute('id','puntuation4');
    }

    if (points < 60) {
        score.setAttribute('id','puntuation3');
    }

    if (points < 40) {
        score.setAttribute('id','puntuation2');
    }
    
    if (points < 20) {
        score.setAttribute('id','puntuation1');
    }
    
    if (points < 0) {
    score.setAttribute('id','puntuation0');
    }

}