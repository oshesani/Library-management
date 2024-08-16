const App = require('./app');


const port = process.env.TEST_PORT || 0; // 0 lets the OS assign a free port
const application = new App(port);


application.listen(() => {
    const assignedPort = application.server.address().port;
    console.log(`Server is running on port ${assignedPort}`);
});

module.exports = application.app;
