'use strict';

const schema = require('./todo.schema');
const Model = require('../model');

class ToDo extends Model {
    constructor() {
        super(schema);
    }

}
module.exports = new ToDo();