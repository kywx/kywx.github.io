import { Timer } from './timer.js';


/* Game state variables */
let _mode = 'easy';

let _currentLevel = 1;
let _progress = 1;
let _ansList = []
let _encounter = [];
let _ans = newNumber(3);
let _lock = 0;
let _newGame = 1;


/* Get elements once */
let _prog = document.getElementById('progress');
let _timer = document.getElementById('timer');
let _restart = document.getElementById('restart');
let _score = document.getElementById('score');
let _difficulty = document.getElementById('difficulty');


/* Instantiate the timer class */
let _Timer = new Timer(_timer);

/* Add Event Listeners */
document.addEventListener("DOMContentLoaded", () => {
    _restart.addEventListener("click", reset);
    _difficulty.addEventListener("click", changeMode);
    for (let i=0; i<3; i++) {
        let element = document.getElementById(i);
        element.addEventListener("click", function() {
            doorClick(element);
        });
    }
})

function changeMode() {
    /* Changes the gamemode and resets the state */
    reset();
    if (_mode == 'easy') {
        _mode = 'hard';
        _difficulty.src = './assets/hard.png';
    } else {
        _mode = 'easy';
        _difficulty.src = './assets/easy.png';
    }
}

function getRandomInt(max) {
    /* Random Number Generator */
    return Math.floor(Math.random() * max);
}

function newNumber(max) {
    /* Get a new number and update arrays */
    var num = getRandomInt(max);
    _ansList.push(num);
    _encounter.push(0);
    return num;
}

function reset() {
    /* Reset Game State */
    _progress = 1;
    _currentLevel = 1;
    _ansList = [];
    _encounter = [];
    _ans = newNumber(3);
    changeLevel(_currentLevel);
    _score.style.display ='none';
    if (_mode == 'easy') {
        resetDoors();
    }
    _lock = 0;
    _newGame = 1;
    _Timer.reset();
}

function softReset() {
    /* Go back to level 1 */
    _currentLevel = 1;
    _ans = _ansList[_currentLevel-1];
    changeLevel(_currentLevel);
}

function changeLevel(level) {
    /* Change the progress text */
    const message = `${level}/12`;
    _prog.innerHTML = message;
}

function resetDoors() {
    /* Reset to closed door images */
    for (let i=0; i<3; i++) {
        let element = document.getElementById(i);
        element.querySelector("img").src = './assets/door.png';
    }
}

function doorClick(element) {
    /* Checks if door clicked is the answer */
    if (_lock) {
        return;
    }

    if (_newGame) {
        _Timer.start();
        _newGame = 0;
    }

    if (_currentLevel == _progress) {
        _encounter[_currentLevel-1] += 1;
    }

    if (element.id == _ans) {
        if (_currentLevel == 12) {
            // window.location.href='./results.html';
            _Timer.stop();
            _score.innerHTML = `Luck: ${calculateScore()}`
            _score.style.display ='block';
            _lock = 1;
            return;
        }

        _currentLevel += 1;
        changeLevel(_currentLevel);
        if (_currentLevel > _progress) {
            _progress += 1;
            _ans = newNumber(3);
            if (_mode == 'easy') {
                resetDoors();
            }
        } else {
            _ans = _ansList[_currentLevel-1];
        }
    } else {
        if (_mode == 'hard') {
            softReset();
        }
        if (_mode == 'easy') {
            // change door image
            element.querySelector("img").src = './assets/doorOpen.png';
        }
    }
}

function calculateScore() {
    /* Loops over encounter array and returns a score */
    var first = 0;
    var second = 0;

    for (const num of _encounter) {
        if (num == 1) {
            first += 1;
        } else if (num == 2) {
            second += 1;
        }
    }

    return Math.floor((first/12)*100 + (second/24)*100);
}
