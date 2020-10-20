'use strict';


module.exports=(req, res, next)=>{
   let date=new Date();
   req.requestTime=date.toUTCString();
   next()

};

// function time() {
//     let date
// }