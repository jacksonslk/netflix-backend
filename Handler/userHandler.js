const R = require('ramda');
const UserService = require('../service/userService.js');
function SignUpHandler(req,res){

    const userInput = req.body;
    console.log(`User Input ${JSON.stringify(userInput)}`);
    if(R.isNil(userInput.email)){
        res.status(400).send("Email not present");
        return;
    }
    if(R.isNil(userInput.phoneNo)){
        res.status(400).send("Phone Number not present");
        return;
    }
    if(R.isNil(userInput.name)){
        res.status(400).send("Name is not present");
        return;
    }
    if(R.isNil(userInput.password)){
        res.status(400).send("Password is not present");
        return;
    }

    UserService.addNewUser(userInput)
    .then(()=>res.status(200).send('User created Successfully!'))
    .catch((error)=>res.status(200).send('Error is '+error));

};

function addNewProfile(req, res){
    const name = req.body.name;
    const userId = req.userId;
    UserService.addNewProfile(userId,name)
    .then(()=>{
        res.status(200).send('Profile added successfully');
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send(error);
    });
};

function deactivateProfile(req, res){
    const profileId = req.params.profileId;
    const userId = req.userId;
    UserService.deactivateProfile(userId, profileId)
    .then(()=>{
        res.status(200).send('Profile Deactivated Successfully');
    })
    .catch(error=>{
        console.log('error = '+error);
        res.status(500).send(error);
    });
};

function updateWatchHistory(req, res){
    const showId = req.params.showId;
    const seriesId = req.params.seriesId;
    const videoId = req.params.videoId;
    const userId = req.userId;
    const watchTime = req.body.watchTime;

    UserService.updateWatchHistory(showId, seriesId, videoId, userId, watchTime)
    .then(()=>{
        res.status(200).send('Watch History Updated');
    })
    .catch(error=>{
        console.log('error is '+error)
    })
};

function getWatchHistory(req, res){
    const showId = req.params.showId;
    const seriesId = req.params.seriesId;
    const videoId = req.params.videoId;
    const userId = req.userId;
    
    return UserService.getWatchHistory(userId, showId, seriesId, videoId)
    .then(watchHistory => {
        res.status(200).send(watchHistory);
    })
    .catch(error => {
        res.status(500).send(error);
    });
};

module.exports = {

    SignUpHandler,
    addNewProfile,
    deactivateProfile,
    updateWatchHistory,
    getWatchHistory
};