const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board  = document.getElementById('board');
const winningMessageElement  = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton')
let circleTurn;
// if (circleTurn == false) means it's xTurn

startGame()

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS); //remove everything after click 'restart' btn
        cell.classList.remove(CIRCLE_CLASS); //remove everything after click 'restart' btn
        cell.removeEventListener('click', handleClick); //remove everything after click 'restart' btn
        cell.addEventListener('click', handleClick, { once: true }) //{ once: true } means it will only fire once
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show'); //remove the dark background message part
}

function handleClick(e) {
    const cell = e.target; //means where you click
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // if it's circleTurn, then return CIRCLE_CLASS. Otherwise, return X_CLASS
    placeMark(cell, currentClass); // placeMark
    if (checkWin(currentClass)) {
        endGame(false) // check for win
    } else if (isDraw()) {
        endGame(true) // check for draw
    } else {
        swapTurns() // switch truns
        setBoardHoverClass()
    }
};

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw(´･_･`)'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win！٩(๑❛ᴗ❛๑)۶`
    };
    winningMessageElement.classList.add('show'); //add 'show' class back into HTML
}

function isDraw() {
    return [...cellElements].every(cell => { //[...   ] destructure 'cellElement' into an array has the method '.every'
    //check if every cell has a class
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => { 
    //check all the W_Cs to see if some of the W_Cs are met by the current combination
        return combination.every(index => {
        //check if all the indexes/value in the cell elements have the same class
            return cellElements[index].classList.contains(currentClass)
            //check if currentClass is in the cellElements inside of the combination
        })
    })
}
