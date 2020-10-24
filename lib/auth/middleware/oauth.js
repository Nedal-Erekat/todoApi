'use strict';
require('dotenv').config();
const users = require('../model/user-schema');
const superagent = require('superagent');


module.exports = async (req, res, next)=> {
    // 1 - get the code
    // 2- exchange code with token
    // 3- i have the token, exchange token with user
    // 4- save user to my db
    
    console.log("req.query ---> ",req.query);
    let code = req.query.code;
    console.log("code : ",code);//'5846fd17b203044a32d2'


// Exchange the code received on the initial request for a token from the Provider
    let token = await exchangeCodeWithToken(code);
    console.log(" token ---> ",token)

// Use the token to retrieve the user’s account information from the Provider
    let user = await exchangeTokenWithUser(token);

// Create/Retrieve an account from our Mongo users database matching the user’s account (email or username) using the users model
    let [savedUser, serverToken] = await saveUser(user);

    req.user = savedUser; 
    req.token = serverToken;
    next();

};

const CLIENT_ID =process.env.CLIENT_id;//shuld be in the .env
const CLINET_SECRET = process.env.CLINET_secret;

async function exchangeCodeWithToken(code) {
    const urlToGetToken = 'https://github.com/login/oauth/access_token';
    const response = await superagent.post(urlToGetToken)
    .send({
        client_id: CLIENT_ID,
        client_secret: CLINET_SECRET,
        code: code,
        redirect_uri: 'http://localhost:3000/oauth'
    });
    
    console.log("exchangeCodeWithToken response ----> ",response.body);
    //{ access_token: 'b71c77b227966ac3a0a3ae378186677aff0ff71a',scope: '',token_type: 'bearer' }
    return response.body.access_token;
}

async function exchangeTokenWithUser(token) {
    let userResponse = await superagent
            .get('https://api.github.com/user')
            .set('Authorization', `token ${token}`)
            .set('User-Agent', 'user-agent/1.0')
    console.log("userResponse.body: ",userResponse.body)
    return userResponse.body;
}

async function saveUser(user) {
    console.log("user: ", user);
    let record = {
        username: user.login,
        password: 'XXXX'
    }
   
    let saveduser = await users.save(record);
    let myserverToken = users.generateToken(saveduser);
    return [saveduser, myserverToken];
}