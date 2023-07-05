const express = require ('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { encryptionMiddleware } = require('./middlewares/request.middleware');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(encryptionMiddleware);

app.get('/', async(req,res,next) => {
    res.send(" Hello from express ")
});

app.post('/', async(req,res,next) => {
    res.send(" Hello from express ")
});

console.log("Namaste Dunia");

module.exports = app;