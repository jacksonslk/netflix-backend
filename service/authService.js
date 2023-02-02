const R = require('ramda');
const UserAccessor = require('../Accessor/userAccessor');
const SessionAccessor = require('../Accessor/sessionAccessor');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "mysecretkey";


function login(email, password){
    return UserAccessor.findByEmail(email)
            .then(users=>{
                console.log(`user = ${JSON.stringify(users)}`);
                if(R.isNil(users) || users.length === 0){
                   return {statusCode: 401, message:"Invalid Email address"};
                };
                let user = users[0];
                console.log(`user.password = ${user.password} and password = ${password}`)
                if(R.isNil(user.password) || user.password !== password){
                   return {statusCode: 401, message: "Invalid Password"};
                };

                const token = jwt.sign({userId: user.userId, email: user.email, role: user.role}, SECRET_KEY);

                return SessionAccessor.createNewSession(user.userId, token)
                .then(()=>({statusCode: 200, token}));
                });           
}

function logout(userId){

    SessionAccessor.getSessionsByUserId(userId)
    .then(()=>{
        return Promise.all(sessions.map(session => session.remove()));
    });

}

module.exports = {

    login,
    logout

};