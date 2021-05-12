const dotenv = require('dotenv');
dotenv.config();
const data = require('./routes/data');
const express = require('express');
const app = express();
app.use(express.json()); //Adding Middleware and using that Middleware
app.use(express.urlencoded({ extended: true }));  //Can send key=value&key=value

app.use(function(req, res, next) {
    console.log('Logging...');
    next();
});

app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/data', data);

// app.get('/data', (req, res) => {
//     res.send('Getting Data...');
// })




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});