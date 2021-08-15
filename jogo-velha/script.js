// Inicial data

let board = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let player = '';
let warning = '';
let playing = false;

reset();

// Events

document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// Functions

function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && board[item] === '') {
        board[item] = player;
        renderBoard();
        togglePlayer();
    }
}

function togglePlayer() {
    player = player === 'x' ? 'o' : 'x';
    renderInfo();
}

function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    player = random === 0 ? 'x' : 'o';

    for (const index in board) {
        board[index] = '';
    }

    playing = true;

    renderBoard();
    renderInfo();
}

function renderBoard() {
    for (const index in board) {
        let item = document.querySelector(`div[data-item=${index}]`);
        item.innerHTML = board[index];
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function checkGame() {
    if (checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false;
    } else if (checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    } else if (isFull()) {
        warning = 'Deu empate';
        playing = false;
    }
}

function checkWinnerFor(player) {
    let possibilities = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (const index in possibilities) {
        let possibilityRow = possibilities[index].split(',');
        let hasWinner = possibilityRow.every(option => board[option] === player);
        if (hasWinner) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for (const index in board) {
        if (board[index] === '') {
            return false;
        }
    }
    return true;
}