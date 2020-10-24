'use strict';
require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const userAccount = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    fullname: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'writer', 'user']
    }
});
// 
// sudo service mongod start

/**
 * Hash the plain text password given, before save a user to the database
 * @param {*} record Data with the keys “username” and “password”
 * @returns record
 */

userAccount.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 5);
})


/**
 * authenticate a user using the hashed password
 * @param {string} user 
 * @param {*} password 
 */

userAccount.statics.authenticateBasic = async function (user, password) {
    // Signin
    let userObj = await this.find({
        username: user
    })
    if (userObj) {

        let valid = await bcrypt.compare(password, userObj[0].password);
        let returnValue = valid ? userObj : Promise.reject();
        return returnValue
    }
    return Promise.reject();

};

/**
 * generate a Token following a valid login
 * @param {*} user 
 */
let roles = {
    admin: ["READ", "CREATE", "UPDATE", "DELETE"],
    editor: ["READ", "CREATE", "UPDATE"],
    writer: ["READ", "CREATE"],
    user: ["READ"]
};

userAccount.statics.generateToken = function (user) {
    //jwt to genrate a token for us.
    // install jwt and generate a token with it and return it.
    console.log('user befor generate token----> : ', user)
    if (user.length) {
        user = user[0];
    }
    let token = jwt.sign({
        username: user.username,
        actions: roles[user.role]
    }, SECRET);
    return token;
};
userAccount.statics.authenticateToken = async function (token) {

    try {
        let tokenObject = jwt.verify(token, SECRET);
        let getUser = tokenObject.username
        let checkUser = await this.find({
            username: getUser
        })

        if (checkUser.length) {
            return Promise.resolve({
                tokenObject: tokenObject,
                user: getUser
            });
        } else {
            return Promise.reject();
        }
    } catch (e) {
        return Promise.reject();
    }

};


module.exports = mongoose.model('users', userAccount);