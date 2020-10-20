'use strict';
/**
 * 
 * @param {*} req 
 * @param {object} res from the server 
 * @param {method} next
 * 
 * @module not-found
 */
module.exports=(req, res, next)=> {
    res.status(404).send('404 Not Found');
}