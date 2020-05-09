window.onload = function() {
    document.addEventListener('keyup',startGame);//Al pulsar espacio queremos cambiar de escena
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
    score.innerHTML = '0 points';
    
    parent.removeChild(intro); //Eliminamos la intro del juego
    
    parent.appendChild(timer);
    parent.appendChild(score);
    parent.appendChild(cube);

    var game = new ReciclingProMaster;
}