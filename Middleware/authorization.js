const R = require('ramda');
const UserAccessor = require('../Accessor/userAccessor.js')

function checkIfAuthorized(allowedRoles){

    return function(req, res, next){

        UserAccessor.findByUserId(req.userId)
        .then(users => {
            let user = users[0];
            if(!R.isNil(user)){
               if(allowedRoles.includes(user.role)){
                req.user = user;
                next();
               }
               else{
                res.status(403).send('User is not authorized');
               };
            }
            else{
                res.status(403).send('Could not find user information!');
            }
        })
    }

}

module.exports = {
    checkIfAuthorized
}