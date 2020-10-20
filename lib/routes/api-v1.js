  /* eslint-disable no-undef */

'use strict';

const express = require('express');
const router = express.Router();
const todo= require('../model/todo/todo.collection')



/**CRUD methods to handl the clinet requestes */

router.get('/api/v1/',(req,res,next)=>{
    todo.getAll()
        .then(data => {
            res.status(200).json({
                todo:data,
            });
    }).catch(next);
})


router.get('/api/v1/todo', function (req, res, next) {
    
    todo.getAll().then(data => {
        console.log(todo);
        res.status(200).json(data);
    })

});

router.get('/api/v1/todo/:id', (req, res, next) => {
    const id = req.params.id;
    todo.get(id).then(data => {
        res.status(200).json(data);
    }).catch(next);

});

router.post('/api/v1/todo', (req, res, next) => {
    console.log('req.body >>:',req.body);
    todo.create(req.body)
        .then(data => {
            res.status(201).json(data);
        }).catch(next);
})

router.get('/api/v1/todo/:id', (req, res, next) => {
    todo.get(req.params.id)
        .then(data => {
            res.status(201).json(data)
        }).catch(next);
})

router.put('/api/v1/todo/:id', (req, res, next) => {
    console.log('req.body >>:',req.body);   
    todo.update(req.params.id, req.body)
        .then(data => {
            console.log(data);
            res.status(201).json(data)
        }).catch(next);

})

router.delete('/api/v1/todo/:id', (req, res, next) => {
    todo.delete(req.params.id)
        .then(data => {
            res.send(data);
        }).catch(next);
})



module.exports = router;
