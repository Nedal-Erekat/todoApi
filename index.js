'use strict';
const server = require('./lib/server.js');
const mongoose = require('mongoose');
const MONGOOSE_URL="mongodb+srv://Nedal:9999@cluster0.7mqob.mongodb.net/test" || process.env.MONGOOSE_url


// connection details should be .env file
// const MONGOOSE_URL = 'mongodb://localhost:27017/food-db';
/**
 * connect the database and start the server
 */

const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}
mongoose.connect(MONGOOSE_URL, mongooseOptions);


//run my server 
server.start();


