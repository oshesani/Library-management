const express = require('express');
const BookController = require('../controllers/bookControllers');
const  ValidateToken = require('../middleware/ValidateTokenHandle');
const router = express.Router();

router.post('/add',ValidateToken.handle, BookController.addBook); 
module.exports = router;

