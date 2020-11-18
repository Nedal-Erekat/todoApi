// Create a POST route for /signin
// Create a GET route for /users that returns a JSON object with all users
'use strict';
const express = require('express');
const users = require('./model/user-schema')
const basicAuth = require('./middleware/basic')
const ouath = require('./middleware/oauth')
const app = express();
const bearerMiddleware = require('./middleware/bearer')

app.use(express.json());


// Create a POST route for /signup
app.post('/api/v1/todo/signup', (req, res) => {
    let newUser = req.body;
    console.log(newUser,"<<<<<<<<body>>>>>>>>");
    users.findOne({
            username: newUser.username
        })
        .then(result => {
            if (!result)  {
                let user = new users(newUser)
                user.save()
                .then(user => {
                    console.log(user);
                    users.generateToken(user)
                        // .then(token=>res.status(200).send(token))
                        .then(token => console.log(token))
                        
                    }).catch(err => res.status(403).send(err,"This user name not availble, Error!!!!!!!!!!"));

            };
        });
});

app.post('/api/v1/todo/signin', basicAuth, (req, res) => {
    console.log('here >><<', req.token);
    res.status(200).send(req.token);
});

app.get('/users', (req, res) => {
    // list all users 
    users.find({})
        .then(data => {
            console.log('reached the all data');
            res.status(200).send(data);
        })
});
app.get('/oauth', ouath, (req, res) => {
    res.status(200).send(req.token);
});

module.exports = app;