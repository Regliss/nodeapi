const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');
const userSchemaValidation = require('../middlewares/validators/users.validator');

router.post('/users', userSchemaValidation, user.create);
router.post('/users/edit/:id', user.update);
router.post('/users/add', userSchemaValidation, user.addAdmin);
router.post('/users/login', user.login);
router.get('/users/:id', verifyToken, user.findOne);
router.get('/users/', user.getUsers);
router.get('/users/delete/:id', user.removeOne);

module.exports = router;