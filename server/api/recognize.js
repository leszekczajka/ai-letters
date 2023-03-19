const { Router } = require("express");
const letters = require('../model/letters');

const router = Router();

router.post('/', (req, res) => {
    let board = req.body.board;
    let char = letters.recognize(board);
    res.status(200).json({ response: char });
    res.end();
});

module.exports = router;