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
    
    req.model.getAll().then(data => {
        console.log(req.model);
        res.status(200).json(data);
    })

});

router.get('/api/v1/todo/:id', (req, res, next) => {
    const id = req.params.id;
    req.model.get(id).then(data => {
        res.status(200).json(data);
    }).catch(next);

});

router.post('/api/v1/todo', (req, res, next) => {
    console.log('req.body >>:',req.body);
    req.model.create(req.body)
        .then(data => {
            res.status(201).json(data);
        }).catch(next);
})

router.get('/api/v1/todo/:id', (req, res, next) => {
    req.model.get(req.params.id)
        .then(data => {
            res.status(201).json(data)
        }).catch(next);
})

router.put('/api/v1/todo/:id', (req, res, next) => {
    console.log('req.body >>:',req.body);   
    req.model.update(req.params.id, req.body)
        .then(data => {
            console.log(data);
            res.status(201).json(data)
        }).catch(next);

})

router.delete('/api/v1/todo/:id', (req, res, next) => {
    req.model.delete(req.params.id)
        .then(data => {
            res.send(data);
        }).catch(next);
})



module.exports = router;
