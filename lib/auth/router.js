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
app.post('/signup', (req, res) => {
    let newUser = req.body;
    users.findOne({
            username: newUser.username
        })
        .then(result => {
            if (!result) {
                let user = new users(newUser)
                user.save()
                    .then(user => {
                        let token = users.generateToken(user);
                        res.status(200).send(token);
                    }).catch(err => res.status(403).send("This user name not availble, Error!!!!!!!!!!"));

            };
        });
});

app.post('/signin', basicAuth, (req, res) => {
    res.status(200).send(req.token);
});

app.get('/users', basicAuth, (req, res) => {
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