/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
const winningCombos = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];



/*------------------------ Cached Element References ------------------------*/
let squareElements = document.querySelectorAll(".sqr");
let messageElement = document.querySelector("#message");
const resetButton = document.getElementById('reset');
console.log(messageElement);


/*-------------------------------- Functions --------------------------------*/
const init = ()=>
{
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
}

const render = ()=>
{
    updateBoard();
    updateMessage();
}

const updateBoard= ()=>
{
    board.forEach((cell, index) =>
    {
        squareElements[index].textContent = cell;
        if (cell === 'X')
        {
            squareElements[index].style.color = 'red';
        }
        else if (cell === 'O')
        {
            squareElements[index].style.color = 'blue';
        }
        else
        {
            squareElements[index].style.color = 'black';
        }
    });
}
const updateMessage= () =>
{
    if (winner)
    {
        messageElement.textContent = `Congratulations! Player ${turn} has won!`;
    }
    else if (tie)
    {
        messageElement.textContent = "It's a tie!";
    }
    else
    {
        messageElement.textContent = `It's ${turn}'s turn`;
    }
}



/*----------------------------- Event Listeners -----------------------------*/
window.onload = init;

const handleClick = (event) =>
{
    const squareIndex = event.target.id;
    if (board[squareIndex] || winner) return;
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

const placePiece = (index)=>
{
    board[index] = turn;
}
const checkForWinner = ()=> 
{
    winningCombos.forEach(combo => 
    {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) 
        {
            winner = true;
        }
    });
}
const checkForTie = () => 
{
    if (!winner && !board.includes(''))
    {
        tie = true;
    }
}
const switchPlayerTurn = () =>
{
    if (!winner)
    {
        turn = turn === 'X' ? 'O' : 'X';
    }
}
resetButton.addEventListener('click', init);

squareElements.forEach((square) =>
{
    square.addEventListener('click', handleClick);
});

init();