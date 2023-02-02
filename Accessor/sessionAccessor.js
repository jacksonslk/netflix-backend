const Sessions = require('../db/Model/sessionModel').Sessions;

function createNewSession(userId, token){

    let session = { userId, token};
    return Sessions.create(session);

}

function getSessionByKey(userId, token){

    let filterQuery = {userId, token};
    return Sessions.find(filterQuery).exec();

}

function removeSession(userId, token){

    return getSessionByKey(userId, token)
    .then(sessions => sessions[0])
    .then(session => session.remove());

}

function getSessionsByUserId(userId){

    return Sessions.find( { userId } ).exec();

}

module.exports = {

    createNewSession,
    getSessionByKey,
    removeSession,
    getSessionsByUserId

};