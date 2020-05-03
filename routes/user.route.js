const express = require('express');
const multer = require('multer');

const controller = require('../controller/user.controller');
const validate = require('../validate/user.validate');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

const upload = multer({ dest: './public/uploads/' });

router.get('/', controller.index);

router.get('/cookie', (req, res, next) => {
	res.cookie('userId', 12345);
	res.send('hello');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.view);

router.post('/create', upload.single('avatar'), 
    validate.postCreate, 
    controller.postCreate
);

module.exports = router
