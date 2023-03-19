const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./api');

// create app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// log all requests
app.use((req, res, next) => {
    console.log(req.method, req.originalUrl, (req.method === "POST" ? JSON.stringify(req.body) : ""));
    next();
});

// api
app.use('/api', apiRouter);

// missed API call
app.use((req, res, next) => {
    console.error("Unknown API call");
    res.status(404).send('Not Found').end();
});

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error').end();
});

app.listen(3001, "127.0.0.1", () => {
    console.log("API server started.");
});