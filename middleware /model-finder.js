
'use strict';
let category=require('../lib/models/categories/categories.collection')
let product=require('../lib/models/products/products.collection')

/**
 * 
 * @param {string} req categories or products
 * @param {*} res 
 * @param {string} next middleware
 * 
 * @module module-finder
 * 
 * @returns {string} switch betwen the categories and products
 */
module.exports=(req, res, next)=> {
    let model = req.params.model;
    switch(model) {
        case "categories":
            req.model = category;
            console.log(">>>>>>>>>>>>><<<<<<<<<<<<",model);
            next();
            break;
        case "products":
            req.model = product;
            next();
            break;
        default:
            next("Invalid Model!!! ");
            break;
    }
}

// You can (and should at some point) add extra logic and security to this module, perhaps extending it with additional functionality such as
// Pre-loading data models
// Listing available models
// Validation and security checks