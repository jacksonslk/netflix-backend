const R = require('ramda');
const showService = require('../service/showService');

function getShowById(req, res){

    const showId = req.params.showId;
    if(R.isNil(showId)){
        res.status(400).send({ errorCode: 'SHOW_ID_DOES_NOT_EXIST' });
    }
    showService.findByShowId(showId)
    .then(show=> {
        if(R.isNil(show)){
            res.status(400).send({errorCode: 'INVALID_SHOW_ID'})
        }
    });
};

function findSeriesByKey(req, res){

    const showId = req.params.showId;
    const seriesId = req.params.seriesId;

    if(R.isNil(showId) || R.isNil(seriesId)){
        res.status(400).send({ errorCode: 'PARAMS_NULL'});
    }

    showService.findSeriesByKey(showId, seriesId)
        .then(series =>{
            if (!R.isNil(series)){
                res.status(200).send(series);
            }
            else{
                res.status(400).send({errorCode:'INVALID_SHOW_SERIES_COMBINATION'});
            }
        })
    };

function findVideoLink(req,res){

    const showId = req.params.showId;
    const seriesId = req.params.seriesId;
    const videoId = req.params.videoId;

    if(R.isNil(showId) || R.isNil(seriesId) || R.isNil(videoId)){
        res.status(400).send({errorCode: 'PARAMS_NULL'});
    }

    showService.findVideoLink(showId, seriesId, videoId)
    .then(video =>{
        if(!R.isNil(video)){
            res.status(200).send(video);
        }
        else{
            res.status(400).send({errorCode: 'INVALID_SHOW_SERIES_VIDEO_COMBINATION'});
        };
    });

}

module.exports={
    getShowById,
    findSeriesByKey,
    findVideoLink
};