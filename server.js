const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const config = require('config');   
const session = require('express-session');
const app = express();

//BodyParser Middleware
// app.use(bodyParser.json()); 

app.use(express.json());

// DB Config 
// const  db = require('./config/keys').mongoURI;
const  db = config.get('mongoURI');
// Connect to mongodb 
mongoose
    .connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// use and fetch routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));

