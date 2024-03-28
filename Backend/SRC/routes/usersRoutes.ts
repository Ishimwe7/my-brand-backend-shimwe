const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.post('/newUser', userController.createNewUser);
router.get('/allUsers', userController.getAllUsers);
router.get('/getUser/:userId', userController.getUserById);
router.put('/editUser/:userId', userController.updateUser);
router.delete('/deleteUser/:userId', userController.deleteUser);

module.exports = router;