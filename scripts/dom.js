//Select rubish
//1 - Papper; 2- Plastic; 3-Organic; 4-Cristal
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

setInterval(changeRubish,5000);