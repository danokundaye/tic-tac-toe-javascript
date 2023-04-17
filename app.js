const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');

//introduce blank values that will later form the 9 boxes for tic-tac-t0e
const startCells = [
    '', '', '', '', '', '','', '', ''
]

let go = 'circle'
infoDisplay.textContent = 'Circle goes first';

//create 'div' and add class 'square' into the gameboard id in the html body
function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addGo);
        gameBoard.append(cellElement);
    })
}

createBoard();

//continue event of click from above and add the circle and cross icons. include a remove event to prevent the target boxes from displaying circles and cross multiples times
function addGo(e) {
const goDisplay = document.createElement('div');
goDisplay.classList.add(go);
e.target.append(goDisplay);

//if go===circle is true(already present), the next box will display cross, otherwise it returns to circle
go = go === 'circle' ? 'cross' : 'circle';
infoDisplay.textContent = 'it is now ' + go + "'s go."
e.target.removeEventListener ('click', addGo);
checkScore()
}

function checkScore() {
   const allSquares = document.querySelectorAll('.square')

    //create directions that ensure a win
    const winningCombos = [
        //horizontal
        [0,1,2],[3,4,5], [6,7,8],
        //vertical
        [0,3,6], [1,4,7], [2,5,8],
        //diagonal
        [0,4,8], [2,4,6]
    ]

    winningCombos.forEach (array => {
        let circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'))

        if (circleWins) {
            infoDisplay.textContent = 'Circle Wins!';
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })

    winningCombos.forEach (array => {
        let crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'))

        if (crossWins) {
            infoDisplay.textContent = 'Cross Wins!';
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })
}


