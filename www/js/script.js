'use strict';
const REFRESH_RATE = 1000 / 25; // 25 fps
const GRAVITY = 9.8;
const FRICTION_FACTOR = 0.6;
const BALL_RADIUS = 15;
const OBSTACLE_WIDTH = 30;
const OBSTACLE_HEIGHT = 30;

let accelX, accelY, accelZ;
let ballPositionX, ballPositionY;
let canvas, context;
let obstacles = [];
let currentScore = 0;
let highScore = 0;
let gameUpdateInterval;
let obstacleAddInterval;
let ballSpeed = 1.5; // Initial ball speed
let obstacleSpeed = 2; // Initial obstacle speed

function init() {
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');
    ballPositionX = canvas.width / 2;
    ballPositionY = canvas.height - BALL_RADIUS - 10;
    window.addEventListener('devicemotion', updateAccelerationValues, true);
    document.getElementById('ballSpeedSlider').addEventListener('input', updateBallSpeed);
    document.getElementById('obstacleSpeedSlider').addEventListener('input', updateObstacleSpeed);

    // Load high score from local storage
    if (localStorage.getItem('highScore')) {
        highScore = parseFloat(localStorage.getItem('highScore'));
        document.getElementById('highScore').innerText = "High Score: " + Math.round(highScore);
    }
    updatePointsPerSecondDisplay();
}

function updateAccelerationValues(event) {
    accelX = event.accelerationIncludingGravity.x;
    accelY = event.accelerationIncludingGravity.y;
    accelZ = event.accelerationIncludingGravity.z;
}

function startGame() {
    document.getElementById('startButton').disabled = true;
    document.getElementById('ballSpeedSlider').disabled = true;
    document.getElementById('obstacleSpeedSlider').disabled = true;
    currentScore = 0;
    obstacles = [];
    gameUpdateInterval = setInterval(updateGame, REFRESH_RATE);
    obstacleAddInterval = setInterval(addObstacle, 1000); // Add a new obstacle every second
}

function updateGame() {
    if (typeof accelX === 'undefined' || typeof accelY === 'undefined' || typeof accelZ === 'undefined') {
        return;
    }

    let frictionFactor = 1 - FRICTION_FACTOR * Math.abs(accelZ) / GRAVITY;
    let accelXAdjusted = accelX * frictionFactor;
    let accelYAdjusted = accelY * frictionFactor;

    ballPositionX -= accelXAdjusted * ballSpeed;
    ballPositionY += accelYAdjusted * ballSpeed;

    if (ballPositionX < BALL_RADIUS) ballPositionX = BALL_RADIUS;
    if (ballPositionX > canvas.width - BALL_RADIUS) ballPositionX = canvas.width - BALL_RADIUS;
    if (ballPositionY < BALL_RADIUS) ballPositionY = BALL_RADIUS;
    if (ballPositionY > canvas.height - BALL_RADIUS) ballPositionY = canvas.height - BALL_RADIUS;

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(ballPositionX, ballPositionY, BALL_RADIUS);
    drawObstacles();
    checkCollisions();
    updateScore();
}

function drawBall(bx, by, r) {
    context.beginPath();
    context.arc(bx, by, r, 0, Math.PI * 2, false);
    context.fillStyle = '#0af';
    context.fill();
    context.closePath();
}

function addObstacle() {
    let obstacleX = Math.random() * (canvas.width - OBSTACLE_WIDTH);
    obstacles.push({ x: obstacleX, y: -OBSTACLE_HEIGHT });
}

function drawObstacles() {
    context.fillStyle = '#f00';
    for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        obs.y += obstacleSpeed;
        context.fillRect(obs.x, obs.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
    }
    obstacles = obstacles.filter(obs => obs.y < canvas.height);
}

function checkCollisions() {
    for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        if (ballPositionX + BALL_RADIUS > obs.x && ballPositionX - BALL_RADIUS < obs.x + OBSTACLE_WIDTH &&
            ballPositionY + BALL_RADIUS > obs.y && ballPositionY - BALL_RADIUS < obs.y + OBSTACLE_HEIGHT) {
            gameOver();
            break;
        }
    }
}

function updateScore() {
    currentScore += (10 / ballSpeed) + obstacleSpeed; // Score calculation based on speeds
    document.getElementById('score').innerText = "Score: " + Math.round(currentScore);

    // Update high score if the current score is higher
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem('highScore', highScore);
        document.getElementById('highScore').innerText = "High Score: " + Math.round(highScore);
    }
}

function gameOver() {
    clearInterval(gameUpdateInterval);
    clearInterval(obstacleAddInterval);
    alert('Game Over! Your score: ' + Math.round(currentScore));
    document.getElementById('startButton').disabled = false;
    document.getElementById('ballSpeedSlider').disabled = false;
    document.getElementById('obstacleSpeedSlider').disabled = false;
}

function updateBallSpeed(event) {
    ballSpeed = parseFloat(event.target.value);
    updatePointsPerSecondDisplay();
}

function updateObstacleSpeed(event) {
    obstacleSpeed = parseFloat(event.target.value);
    updatePointsPerSecondDisplay();
}

function updatePointsPerSecondDisplay() {
    let pointsPerSecond = (10 / ballSpeed) + obstacleSpeed;
    document.getElementById('pointsPerSecond').innerText = "Points per Second: " + pointsPerSecond.toFixed(2);
}
