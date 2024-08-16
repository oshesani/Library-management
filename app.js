const express = require("express");
const connectDb = require("./config/connectDb");
require('dotenv').config();
const cors = require("cors");
const userRoutes = require('./route/userRoute');
const LibraryRoute = require('./route/libraryRoute');
const bookRoutes = require('./route/bookRoute');
const { generalLimiter } = require("./middleware/rateLimiter");

class App {
    constructor(port = process.env.PORT || 5000) { // Allow port to be passed in
        this.app = express();
        this.port = port;

        this.connectDatabase();
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    // Connect to the database
    connectDatabase() {
        connectDb();
    }

    // Initialize middlewares
    initializeMiddleware() {
        this.app.use(generalLimiter);
        this.app.use(cors({
            origin: 'http://localhost:5000'
        }));
        this.app.use(express.json());
    }

    // Initialize routes
    initializeRoutes() {
        this.app.get('/', (req, res) => {
            res.send('Server is working!');
        });

        this.app.use("/api/users", userRoutes);
        this.app.use('/api/libraries', LibraryRoute);
        this.app.use('/api/books', bookRoutes);
    }

    // Start the server
    listen(callback) {
        this.server = this.app.listen(this.port, callback);
    }
}

module.exports = App;



