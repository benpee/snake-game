document.addEventListener('DOMContentLoaded', function () {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width = 10;
    let currentIndex = 0;
    let appleIndex = 0;

    // the snake with 2 for HEAD, 0 for he tail, body part is 1
    let currentSnake = [2, 1, 0]

    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    // start and restart game
    const startGame = function () {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;

        // randomApple
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(i => squares[i].classList.add('snake'))
        interval = setInterval(moveOutComes, intervalTime);
    }

    // function dealing with all the snake moves outcome
    const moveOutComes = function () {

        // when the snake hit itself or border
        if (
            // nake hit the bottom or right or left or top wall or itself
            (currentSnake[0] + width >= (width * width) && direction === width) ||
            (currentSnake[0] % width === width - 1 && direction === 1) ||
            (currentSnake[0] % width === 0 && direction === -1) ||
            (currentSnake[0] - width < 0 && direction === -width) ||
            squares[currentSnake[0] + direction].classList.contains('snake')
        ) return clearInterval(interval);

        const tail = currentSnake.pop(); // remove and display last array item 
        squares[tail].classList.remove('snake'); // remove class of snake from the tail
        currentSnake.unshift(currentSnake[0] + direction); // direct the head of the array

        // when the snake's head hit the apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            // randomApple()
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            intervalTime = setInterval(moveOutComes, interval);
        }
        squares[currentSnake[0]].classList.add('snake');
    }

    const randomApple = function () {
        do {
            appleIndex = Math.floor(Math.random() * squares.length);
        }
        // avoid apple showing on div wit snake
        while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple');
    }

    // assign functions to keycodes
    const control = function (e) {
        // removing snake from all the squares
        squares[currentIndex].classList.remove('snake');

        if (e.keyCode === 39)
            // right arrow key, snake goes right
            direction = 1

        if (e.keyCode === 38)
            // up arrow pressed, snake goes back 10 divs
            direction -= width

        if (e.keyCode === 37)
            // left arrow, snake goeas left one div
            direction -= 1;

        if (e.keyCode === 40)
            // down arrow, snake appear ten div it is now
            direction += width;
    }

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);
})