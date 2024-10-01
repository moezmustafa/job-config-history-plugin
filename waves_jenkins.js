<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <style>
        canvas {
            display: block;
            margin: auto;
            background-color: #000;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="400" height="400"></canvas>

    <script>
        // Get the canvas and its 2D context
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // Define the game grid size
        const boxSize = 20; // Size of each cell
        const canvasSize = 400;
        const rows = canvasSize / boxSize;
        const columns = canvasSize / boxSize;

        // Define the snake object
        let snake = [];
        snake[0] = { x: 9 * boxSize, y: 10 * boxSize }; // Initial position

        // Food position
        let food = {
            x: Math.floor(Math.random() * columns) * boxSize,
            y: Math.floor(Math.random() * rows) * boxSize,
        };

        // Game direction
        let direction;
        let score = 0;

        // Add event listener to listen to keypresses
        document.addEventListener('keydown', setDirection);

        function setDirection(event) {
            if (event.keyCode == 37 && direction != 'RIGHT') {
                direction = 'LEFT';
            } else if (event.keyCode == 38 && direction != 'DOWN') {
                direction = 'UP';
            } else if (event.keyCode == 39 && direction != 'LEFT') {
                direction = 'RIGHT';
            } else if (event.keyCode == 40 && direction != 'UP') {
                direction = 'DOWN';
            }
        }

        // Check if the snake eats the food
        function eatFood() {
            if (snake[0].x == food.x && snake[0].y == food.y) {
                score++;
                food = {
                    x: Math.floor(Math.random() * columns) * boxSize,
                    y: Math.floor(Math.random() * rows) * boxSize,
                };
            } else {
                snake.pop(); // Remove the last part of the snake if no food is eaten
            }
        }

        // Check if the snake hits the wall or itself
        function collision(newHead, snake) {
            for (let i = 0; i < snake.length; i++) {
                if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
                    return true;
                }
            }
            return (
                newHead.x < 0 ||
                newHead.y < 0 ||
                newHead.x >= canvasSize ||
                newHead.y >= canvasSize
            );
        }

        // Game loop to update and draw the game
        function game() {
            // Draw the canvas background
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw the snake
            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = i === 0 ? '#00FF00' : '#FFFFFF'; // Head and body
                ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
            }

            // Draw the food
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(food.x, food.y, boxSize, boxSize);

            // Old snake head position
            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            // Update the head position based on the direction
            if (direction == 'LEFT') snakeX -= boxSize;
            if (direction == 'UP') snakeY -= boxSize;
            if (direction == 'RIGHT') snakeX += boxSize;
            if (direction == 'DOWN') snakeY += boxSize;

            // New snake head position
            let newHead = { x: snakeX, y: snakeY };

            // Check for collisions
            if (collision(newHead, snake)) {
                clearInterval(gameInterval); // Stop the game loop if collision
                alert('Game Over! Your score: ' + score);
                return;
            }

            // Move the snake
            eatFood();
            snake.unshift(newHead); // Add the new head to the snake array

            // Draw the score
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '30px Arial';
            ctx.fillText('Score: ' + score, 10, 30);
        }

        // Run the game loop at a set interval (speed of the snake)
        const gameInterval = setInterval(game, 100);
    </script>
</body>
</html>
