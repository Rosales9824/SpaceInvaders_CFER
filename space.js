let titleSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = titleSize * columns; // 32*16
let boardHeight = titleSize * rows; // 32*16
let context;

let shipWidth = tileSize*2;
let shipHeight = tileSize;
let shipX = tileSize * columns/2 - tileSize;
let shipY = tileSize * rows - tileSize*2;
let shipImg;
let shipVelocityX = tileSize; // Velocidad de movimiento de la nave.

let alienArray = [];
let alienWidth = tileSize*2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;
let alienVelocityX = 1; // Velocidad de movimiento del alien.

let alienRows = 2;
let alienColumns = 3;
let alienCount = 0; // Numero de aliens a derrotar.

let bulletArray = [];
let bulletVelocityY = -10;

let score = 0;

let ship = {
x: shipX,
y: shipY,
width: shipWidth,
height: shipHeight
}

window.onload = function() {
board = document.getElementById("board");
board.width = boardWidth;
board.height = boardHeight;
context = board.getContext("2d");


//context.fillStyle = "green";
//context.fillRect(ship.x, ship.y, ship.width, ship.height);

// Cargando la imagen
shipImg = new image();
shipImg.src = "ship.png";
shipImg.onload = function(){
context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
}

alienImg = new Image();
alienImg.src = "alien.png";
createAlien();

document.addEventListener("keydown",moveShip);
document.addEventListener("keyup",shoot);
requestAnimationFrame(update);
}

function update(){
requestAnimationFrame(update);

context.clearRect(0,0, boardWidth, boardHeight);

context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height)

for( let i = 0; i< alienArray.length ; i++){
let alien = alienArray[i];
if(alien.alive){
alien.x += alienVelocityX;
// Si los aliens tocan los bordes.
if(alien.x + alien.width >= board.width || alien.x <= 0 ){
alienVelocity *= -1;
alien.x += alienVelocityX*2;
for(let j = 0; j< alienArray.length ; j++){
alienArray[j].y += alienHeight; // Aumentando una fila
}
}

context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);
}
}

for(let i= 0 ; 1 < bulletArray.length; i++){
let bullet = bulletArray[i];
bullet.y += bulletVelocityY;
context.fillStyle = "white";
context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
// Colision de balas con el alien.
for( let j=0; j< alienArray.lenght; j++){
let alien = alienArray[j];
if(!bullet.used && alien.alive && detectCollition(bullet,alien)){
bullet.used = true;
alien.alive= false;
alienCount --;
score += 100;
}
}
}

while ( bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0)){
bulletArray.shift(); // Remueve el primer elemento del arreglo.
}


}

function moveShip(e){
if(e.code == "ArrowLeft" && ship.x - shipVelocity >= 0){
ship.x -= shipVelocityX;
}else if(e.code == "ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width){
ship.x += shipVelocityX;
}

function createAliens(){
for(let c = 0; c < alienColumns ; c++){
for(let r = 0; r < alienRows; r++){
let alien = {
img: alienImg,
x: alienX +c*alienWidth,
y: alienY +r*alienHeight,
width: alienWidth,
height: alienHeight,
alive: true
}
alienArray.push(alien);
}
}
alienCount= alienArray.length;
}

function show(e){
if(e.code == "Space"){
//Disparo
let bullet = {
x: ship.x + shipWidth*15/32,
y: ship.y,
width: tileSize/8,
height: tileSize/2,
used: false
}
bulletArray.push(bullet);
}
}
}

function detectCollition(a,b){
return a.x < b.x + b.width && // Verificamos si la esquina SuperiorIzquierda ak ibheti a no alcanza la esquina superior derecha de la pantalla
a.x +a.width > b.x && // Verificamos si la esquina SuperiorDerecha de a pasa a de la esquina superior izquerda de b
a.y < b.y + b.height && // Verificamos si la esquina Superiorizuqierda de a No alcanza la esquina inferior izquerda de b
a.y + a.height > b.y; // Verificamos si la esquina inferior izquierda de a pasa  la esquina superior izquierda de b

}