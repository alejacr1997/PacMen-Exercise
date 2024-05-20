var pos = 0;
var intTimeout = 0;

const pacArray = [
    ['PacMan1.png', 'PacMan2.png'],
    ['PacMan3.png', 'PacMan4.png']
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen
var numberTimeout = 0;

function setToRandomVelocity(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}

function setToRandomPosition(scale,minY) {
    return {
        x: Math.random() * scale,
        y: (Math.random() * scale) + minY
    }
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
    let minY = document.getElementById("title").clientHeight + document.getElementById("divider").clientHeight + document.getElementById("buttons").clientHeight;
    let game = document.getElementById('game');
    document.getElementById("startGame").disabled = false;
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandomVelocity(10); // {x:?, y:?}
    let position = setToRandomPosition(100,minY);
    console.log(game.clientHeight);
    // Add image to div id = game
    
    let newimg = document.createElement('img');
    let focus = 0;
    let direction = 0;
    newimg.style.position = 'absolute';
    newimg.src = pacArray[direction][focus];
    newimg.width = 100;
    //
    // set position here 
    //
    newimg.style.top = position.y;
    newimg.style.left = position.x;

    // add new Child image to game
    game.appendChild(newimg);
    // return details in an object
    return {
        position,
        velocity,
        newimg,
        focus,
        direction
    }
}

function update() {
    document.getElementById("startGame").disabled = true;
    document.getElementById("addPacMan").disabled = true;
    document.getElementById("stopGame").disabled = false;
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item);
        determineLineMovement(item);
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        item.focus = (item.focus + 1)%2;
        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
        item.newimg.src = pacArray[item.direction][item.focus];
    });
    numberTimeout = setTimeout(update, 200);
}

function checkCollisions(item) {
    let minY = document.getElementById("title").clientHeight + document.getElementById("divider").clientHeight + document.getElementById("buttons").clientHeight;
    if ((item.position.x + item.velocity.x + item.newimg.width > document.getElementById("game").clientWidth) || 
    (item.position.x + item.velocity.x < 0)) item.velocity.x = -item.velocity.x;
    if ((item.position.y + item.velocity.y + item.newimg.height > document.getElementById("game").clientHeight) || 
    (item.position.y + item.velocity.y < minY)) item.velocity.y = -item.velocity.y;
}

function determineLineMovement(item) {
    if (item.velocity.x > 0) item.direction = 0;
    if (item.velocity.x < 0) item.direction = 1;
}

function stop() {
    document.getElementById("startGame").disabled = false;
    document.getElementById("addPacMan").disabled = false;
    document.getElementById("stopGame").disabled = true;
    clearTimeout(numberTimeout);
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}