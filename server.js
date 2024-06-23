//calls required dependencies and routes needed for the app
const express = require('express');
const apiRoutes = require('./routes/apiroutes');
const htmlRoutes = require('./routes/htmlRoutes');

//defines the app and makes a port to 3001
const app = express();
const PORT = process.env.PORT || 3001;

//calling the routes and using them
apiRoutes(app);
htmlRoutes(app);

//middleware for error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//makes console log log the url for the port for ease access to the page through the terminal
app.listen(PORT, () => {
    console.log(`Server is listening at localhost${PORT}`);
})