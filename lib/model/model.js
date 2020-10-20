'use strict';


/**
 * This will serve as the “master” class for Mongo data collections
 * containes crud operations 
 * @class 
 * @constructor
 * 
 * @property schema 
 */

class Model {
   /** 
    *  */ 
    constructor(schema) {
        this.schema = schema;
    }
/**
 * thies methods will deal with database to get the informationa and data for the app
 * @member
 */
    create(record) {
        let newRecord = new this.schema(record);
        return newRecord.save();
    }
    
    get(_id) {
        let obj = _id ? { _id } : {};
        return this.schema.find(obj);
    }
    getAll(){
        return this.schema.find();
    }

    update(_id, record) {
        return this.schema.findByIdAndUpdate(_id, record);
    }

    delete(_id) {
         return this.schema.findByIdAndDelete(_id);
    }
}
/**
 * general model for collections
 * @module data-collections
 */

module.exports = Model;