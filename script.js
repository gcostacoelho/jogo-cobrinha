let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
let fruit = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}


function createBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box);
}

function createSnake(){
    for (i=0; i< snake.length; i++){
        context.fillStyle= "black";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function createFruit(){
    context.fillStyle = "red";
    context.fillRect(fruit.x,fruit.y, box, box);
}

document.addEventListener("keydown", update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction='left';
    if(event.keyCode == 38 && direction != 'down') direction='up';
    if(event.keyCode == 39 && direction != 'left') direction='right';
    if(event.keyCode == 40 && direction != 'up') direction='down';
}

function startGame(){
    /*Coordena os movimentos da cobra*/
    if(snake[0].x > 15 * box && direction =='right') snake[0].x=0;
    if(snake[0].x < 0 * box && direction =='left') snake[0].x=16*box;
    if(snake[0].y > 15 * box && direction =='down') snake[0].y=0;
    if(snake[0].y < 0 * box && direction =='up') snake[0].y=16*box;
    
    /*Verifica se a cobra se chocou com ela mesma e encerra o jogo*/
    for(i=1;i<snake.length;i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y ){
            clearInterval(game);
            alert("GAME OVER :(");
        }
    }

    createBG();
    createFruit()
    createSnake();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    /*Aumenta a cobra e realoca a fruta em um campo aleatório*/
    if(snakeX != fruit.x || snakeY != fruit.y){
       snake.pop();
    }else{
        fruit.x = Math.floor(Math.random() * 15 + 1) * box;
        fruit.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x:snakeX,
        y:snakeY
    }
    snake.unshift(newHead);
}

let game = setInterval(startGame, 100)
