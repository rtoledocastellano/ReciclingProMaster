//Select rubish
//1 - Papper; 2- Plastic; 3-Organic; 4-Cristal
var points = 0;
var timeLeft = 30.0;

function changeRubish(){
    var cube = document.getElementById("cube");
    var rubishType = random();
    switch(rubishType) {
        case 1:
            cube.removeAttribute('class');
            cube.setAttribute('class','cube-papper');
            cube.setAttribute('value','1');
            break;
        case 2:
            cube.removeAttribute('class');
            cube.setAttribute('class','cube-plastic');
            cube.setAttribute('value','2');
            break;
        case 3:
             cube.removeAttribute('class');
            cube.setAttribute('class','cube-organic');
            cube.setAttribute('value','3');
            break;
        case 4:
            cube.removeAttribute('class');
            cube.setAttribute('class','cube-cristal');
            cube.setAttribute('value','4');
            break;
    }
}

function generateRubish() {
    var parent = document.getElementById('canvas');
    var firstChild = document.getElementById('cube');
    var rubish = document.createElement('div');
    var rubishType = random();
    switch(rubishType) {
        case 1:
            rubish.setAttribute('class','rubish-papper');
            rubish.setAttribute('value','1');
            break;
        case 2:
            rubish.setAttribute('class','rubish-plastic');
            rubish.setAttribute('value','2');
            break;
        case 3:
            rubish.setAttribute('class','rubish-organic');
            rubish.setAttribute('value','3');
            break;
        case 4:
            rubish.setAttribute('class','rubish-cristal');
            rubish.setAttribute('value','4');
            break;
    }    
    parent.insertBefore(rubish,firstChild);
    var top = Math.floor(Math.random() * 350 + 80);
    var left = Math.floor(Math.random() * 1000 + 100);
    rubish.style.top = top + 'px';
    rubish.style.left = left + 'px';
    activateRubish();
}

function removeItem(e) {
    var item = e.currentTarget;
    item.parentNode.removeChild(item);
}

function checkCorrect(e){
var rubish = e.currentTarget;
var cube = document.getElementById('cube');
    if(rubish.getAttribute('value') == cube.getAttribute('value')) {
        points+=5;
    }
    else {
        points-=5;
    }
removeItem(e); 
updatePoints();
}

function activateRubish(){
    var rubish = document.querySelectorAll(".rubish-cristal,.rubish-organic,.rubish-plastic,.rubish-papper");
    for (var i= 0; i<rubish.length;i++) {
    rubish[i].addEventListener('click',checkCorrect);
    }
}

function updatePoints(){
    var score = document.getElementById('score');
    score.innerHTML = `${points} points`;
}

var downloadTimer = setInterval(function(){
    if (timeLeft <= 0) {
        clearInterval(downloadTimer);
        clearInterval(trial1);
        clearInterval(trial2);
        document.getElementById('timer').innerHTML = 0.00;
    }
    else {
        timeLeft -= 0.1;
    document.getElementById('timer').innerHTML = `${timeLeft}`;
    }
},100)

var trial1 = setInterval(changeRubish,5000);
var trial2 = setInterval(generateRubish,1000);