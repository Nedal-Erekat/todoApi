'use strict';

const base64 = require('base-64');
const users = require('../model/user-schema');

module.exports = (req, res, next) => {
    // pass the username and password to this method;
    // Basic Authentication (HTTP Headers)
    // we expect to have req headers 
    // Basic YWhtYWRfc2hlbGEgOjEyMzQ=
    console.log(req.headers.authorization,'<<<<<<<<<<<<<<<');
    if (!req.headers.authorization) {
        return next('Invalid Login, No Headers !!');
    }
    const auth = req.headers.authorization.split(' ');
    if(auth[0] == 'Basic') {
        const [username, password] = base64.decode(auth[1]).split(':'); 
        users.authenticateBasic(username, password).then(validUser=>{
            let token = users.generateToken(validUser);
            console.log(username,'>>>>>>>>>>>>',token);
            console.log(token);
            req.token = token;
            next();
            
        }).catch(err=> next(err));
    } else {
        console.log('invalid login!!!!!!!!!!!!!!!!!!!!!');
        next('Invalid Login!! ');
    }
}
