var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "images/nurick.png";
bg.src = "images/flappy_bird_bg.png";
fg.src = "images/flappy_bird_fg.png";
pipeUp.src = "images/flappy_bird_pipeUp.png";
pipeBottom.src = "images/flappy_bird_pipeBottom.png";

 
 

var gap = 190;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
 
 yPos -= 25;
 fly.play();
}

// Создание блоков
var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
 ctx.drawImage(bg, 0, 0);

 for(var i = 0; i < pipe.length; i++) {
	 if(score==5 ) {
 document.location.href = "winner.html";
 }
 if (score<5) {ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);}
 
 pipe[i].x--;

 if(pipe[i].x == 1000) {
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 });
 }
 
 // Отслеживание прикосновений
 if(xPos + bird.width >= pipe[i].x
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
 document.location.href = "lose.html"; // Перезагрузка страницы
 }
 
  if(pipe[i].x == 5) {
 score++;
  }
  
   
 }
 
 ctx.drawImage(fg, 0, cvs.height - fg.height);
 ctx.drawImage(bird, xPos, yPos);

 yPos += grav;

 ctx.fillStyle = "#000";
 ctx.font = "24px Verdana";
 ctx.fillText("Сдано Экзаменов: " + score, 10, cvs.height - 20);

 requestAnimationFrame(draw);
}

pipeBottom.onload = draw;