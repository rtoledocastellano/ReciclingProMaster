//Function from 1 to 4 to set the type of waste
//1 - Papper; 2- Plastic; 3-Organic; 4-Cristal
function random () {
return Math.floor(Math.random()*4 + 1);
}

    setInterval(changeRubish,5000);
    setInterval(generateRubish,3000);



