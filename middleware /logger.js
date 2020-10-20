'use strict';

/**
 * 
 * @param {string} req method and path of the request from the client 
 * @param {*} res 
 * @param {method} next middleware to go to continue to the next
 * 
 * to show the method of the request on the comand line 
 * @module logger 
 */
module.exports = (req, res, next) => {
    console.log("__REQUEST__: ", req.method, req.path);
    next();
};