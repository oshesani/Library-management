const express = require('express');
const LibraryController = require('../controllers/libraryControllers'); 
const validateToken = require("../middleware/ValidateTokenHandle");

class LibraryRoute {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/create', validateToken.handle, LibraryController.createLibrary);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new LibraryRoute().getRouter();


