const { Shows } = require('../db/Model/showModel');

function findByShowId(showId){
    return Shows.find({ showId }).exec();
}

module.exports = {
    findByShowId
};