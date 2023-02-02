const jwt = require('jsonwebtoken');
const R = require('ramda');
const SessionsAccessor = require('../Accessor/sessionAccessor.js');
const SECRET_KEY = "123456";


function CheckIfAuthenticated(req, res, next){

    const tokenString = String(req.headers['authorization']);
    console.log(tokenString);
    if(!R.isNil(tokenString)){
        const actualToken = tokenString.split(' ')[1];
        if(!R.isNil(actualToken)){
            try{
            let data = jwt.verify(actualToken, SECRET_KEY);
            let userId = data['userId'];
            SessionsAccessor.getSessionByKey(userId, actualToken)
            .then((sessions)=>{
                let Session = sessions[0];
                if(!R.isNil(Session)){
                    req.userId = userId;
                    next();
                }
                else if(sessions[0] === null){
                    res.status(401).send('Could not find a session for you. Please try again later!!');
                };
            });
        }
        catch(error){
            res.status(401).send('Unable to decode the token!');
        }
        }
        else if(tokenString.split(' ')[1] === null){
            res.status(401).send('Please login before accessing the API');
        };
    }
    else if(tokenString === null){
        res.status(401).send('Please login before accessing the API');
    };

};

module.exports={

    CheckIfAuthenticated
    
};