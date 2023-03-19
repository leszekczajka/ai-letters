const ROWSIZE = 8;
const BOARDSIZE = ROWSIZE * ROWSIZE;
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const learningSpeed = 0.001;

var wagi = Array(letters.length).fill(null).map(() => Array(BOARDSIZE).fill(0));

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function calculate(board) {
    let retVal = Array(letters.length);
    for (let i = 0; i < wagi.length; i++) {
        let ret = 0;
        for (let j = 0; j < BOARDSIZE; j++) {
            if (board[j]) ret += wagi[i][j];
        };
        retVal[i] = ret;
    };
    return retVal;
}

function recognize(board) {
    let c = calculate(board);
    let maxI = getRandomInt(letters.length);
    for (let i = 0; i < c.length; i++) {
        if (c[i] > c[maxI]) {
            maxI = i;
        }
    };
    return letters[maxI];
}

function correct(board, letter) {
    let letterIndex = letters.indexOf(letter);
    if (letterIndex === -1) return;
    let correction = undefined;
    let c = calculate(board);
    for (let i = 0; i < wagi.length; i++) {
        correction = learningSpeed * ((i === letterIndex ? 8 : 0) - c[i]);
        for (let j = 0; j < BOARDSIZE; j++) {
            if (board[j]) wagi[i][j] = wagi[i][j] + correction;
        };
    };
}

function learn(board, letter) {
    let recognized = recognize(board);
    while (recognized !== letter) {
        correct(board, letter);
        recognized = recognize(board);
    };
}

module.exports = {
    recognize: recognize,
    learn: learn
}