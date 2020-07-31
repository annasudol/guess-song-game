const express = require('express');

const scoreController = require('../controllers/score-controllers');

const router = express.Router();


router.post('/record', scoreController.recordScore);
router.get('/:uid', scoreController.getScoreByUserId);
router.patch('/update', scoreController.updateScore);

module.exports = router;
