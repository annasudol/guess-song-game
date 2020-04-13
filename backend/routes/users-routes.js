const express = require('express');

const usersController = require('../controllers/users-controllers');

const router = express.Router();


router.post('/login', usersController.login);
router.get('/users', usersController.getUsers);


module.exports = router;
