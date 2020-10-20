'use strict';
module.exports=(error, req, res, next)=> {
    console.log("Server side Error 500")
    res.status(500).json({err: error});
  }

// we have to have 4 arguments for the error Handler
