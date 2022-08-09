'use strict'

//Присваивание переменных
const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');

const ground = new Image();
ground.src = '../assets/img/snakeGround.png';

const food = new Image();
food.src = '../assets/img/snakeFood.png';

let smBox = 32;
let score = 0;

//Функция отрисовки
function renderGame() {
    context.drawImage(ground, 0, 0);
    context.drawImage(food, foodPlace.x, foodPlace.y);
    for (let i = 0; i < snakePlace.length; i += 1) {
        context.fillStyle = i === 0 ? 'green' : 'yellow';
        context.fillRect(snakePlace[i].x, snakePlace[i].y, smBox, smBox)
    }

    context.fillStyle = 'white';
    context.font = '40px Arial';
    context.fillText(score, smBox * 3, smBox * 1.7)

    let snakeX = snakePlace[0].x;
    let snakeY = snakePlace[0].y;

    if (snakeX === foodPlace.x && snakeY === foodPlace.y) {
        score++;
        foodPlace = {
            x: Math.floor(Math.random() * 17 + 1) * smBox,
            y: Math.floor(Math.random() * 15 + 3) * smBox,
        }
    } else {
        snakePlace.pop()
    }

    if (snakeX < smBox || snakeX > smBox * 17 || snakeY < smBox * 3 || snakeY > smBox * 17) clearInterval(game)

    if (dir === 'left') snakeX -= smBox
    else if (dir === 'right') snakeX += smBox
    else if (dir === 'up') snakeY -= smBox
    else if (dir === 'down') snakeY += smBox

    function eatOwnTail(head, array) {
        for (let i = 0; i < array.length; i += 1) {
            if (head.x === array[i].x && head.y === array[i].y) {
                clearInterval(game)
            }
        }
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatOwnTail(newHead, snakePlace)
    snakePlace.unshift(newHead)

}

let game = setInterval(renderGame, 100);

//Координаты еды и змейки
let foodPlace = {
    x: Math.floor(Math.random() * 17 + 1) * smBox,
    y: Math.floor(Math.random() * 15 + 3) * smBox,
}

let snakePlace = []
snakePlace[0] = {
    x: 9 * smBox,
    y: 10 * smBox
}

//Движение змейки
document.addEventListener('keydown', direction)

let dir = null;

function direction(event) {
    if (event.keyCode === 37 && dir !== 'right') dir = 'left';
    else if (event.keyCode === 38 && dir !== 'down') dir = 'up';
    else if (event.keyCode === 39 && dir !== 'left') dir = 'right';
    else if (event.keyCode === 40 && dir !== 'up') dir = 'down';
}
