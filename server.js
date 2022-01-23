const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// fetch routes
const users = require('./routes/api/users');

const app = express();

//BodyParser Middleware
app.use(bodyParser.json());

// DB Config 
const  db = require('./config/keys').mongoURI;

// Connect to mongodb 
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// use routes
app.use('/api/users', users);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));

