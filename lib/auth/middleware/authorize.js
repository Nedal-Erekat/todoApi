'use strict';
// check users roles and of they are allowed to do the action
module.exports = (action) => {
    return (req, res, next) => {
        console.log("in acl middleware !!! ")
        console.log(action,'<<<<<<<<<<>>>>>>>>>',req.user.tokenObject.actions);
        console.log(req.user.tokenObject.actions.includes(action));
        try {
            if (req.user.tokenObject.actions.includes(action)) {
                next();
            } else {
                next('Invalid Action! ')
            }
        } catch (e) {
            next('Invalid!');
        }
    };
}