const { Router } = require("express");
const letters = require('../model/letters');

const router = Router();

router.post('/', (req, res) => {
    let board = req.body.board;
    let letter = req.body.letter;
    letters.learn(board, letter);
    res.status(200).json({});
    res.end();
});

module.exports = router;