import {crearCanvas, renderizar, SnakeBody, SnakeFood} from './graphics.js';

let canvas = crearCanvas();

let ctx = canvas.ctx;
let fps = 15, start = 0, frameDuration = 1000 / fps;


let snake = [];
snake[0] = new SnakeBody(); // Cabeza
snake[0].dir = 2;

let comida = new SnakeFood();

ctx.fillStyle = 'red';
ctx.fillRect(40,40,20,20);

window.addEventListener("keydown", e => {

    if (e.key === 'd' || e.key === 'ArrowRight'){
        snake[0].dir = 2
    }

    if (e.key === 'a' || e.key === 'ArrowLeft'){
        snake[0].dir = 0
    }

    if (e.key === 'w' || e.key === 'ArrowUp'){
        snake[0].dir = 1
    }

    if (e.key === 's' || e.key === 'ArrowDown'){
        snake[0].dir = 3
    }
});

function loop(timeStamp){
    if (timeStamp >= start){
        actualizar();
        renderizar(canvas);
        comida.render(ctx);

        for (let i = 0; i < snake.length; i++){
            snake[i].render(ctx);
        }

        start = timeStamp + frameDuration;
    }

    requestAnimationFrame(loop);
}

function snakeUbi(){
    if (snake.length > 1){
        for (let i = 0; i < snake.length -1;i++){
            snake[snake.length - i - 1].x = snake[snake.length - i - 2].x;
            snake[snake.length - i - 1].y = snake[snake.length - i - 2].y;
        }
    }
}

function colision(){
    let hit = false;
    if (snake.length > 1){
        for (let i = 0; i < snake.length - 1; i++){
            if (snake[0].x == snake[i + 1].x && snake[0].y == snake[i + 1].y ) hit = true
        }
    }
    return hit
}

function actualizar(){

    if (colision()){
        snake = [];
        console.log(canvas.width,canvas.height);
        var gameOver = document.createElement("div");
        gameOver.setAttribute("id","gameOver");
        var gameOverText = document.createElement("p");
        gameOverText.setAttribute("id","gameOverText");
        gameOverText.textContent = "GAME OVER"
        document.getElementById("marco").appendChild(gameOver);
        document.getElementById("gameOver").appendChild(gameOverText);
        document.getElementById("canvas").remove();

        var retry = document.createElement('button');
        document.getElementById("gameOver").appendChild(retry);

        retry.textContent = "Retry?"
        retry.addEventListener('click', () => {
            location.reload();
        });
        
    }

    snakeUbi();

    snake[0].mover();

    if (snake[0].x >= canvas.width) {
        snake[0].x = 0
    }
    else if (snake[0].x < 0){
        snake[0].x = canvas.width - 20;
    }

    if (snake[0].y >= canvas.width) {
        snake[0].y = 0
    }else if (snake[0].y < 0){
        snake[0].y = canvas.height - 20;
    }

    if (snake[0].x == comida.x && snake[0].y == comida.y){
        snake[snake.length] = new SnakeBody();
        comida.relocate();
    }
}

loop();