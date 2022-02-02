const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

const app = express();

//BodyParser Middleware
// app.use(bodyParser.json());

app.use(express.json());

// DB Config 
const  db = require('./config/keys').mongoURI;

// Connect to mongodb 
mongoose
    .connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// use and fetch routes
app.use('/api/users', require('./routes/api/users'));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));

