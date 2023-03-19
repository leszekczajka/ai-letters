const { Router } = require("express");
const apiRecognize = require('./recognize');
const apiLearn = require('./learn');

const router = Router();

router.use('/recognize', apiRecognize);
router.use('/learn', apiLearn);

module.exports = router;