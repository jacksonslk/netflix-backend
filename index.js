const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserHandler = require('./Handler/userHandler.js');
const AuthHandler = require('./Handler/authHandler.js');
const ShowHandler = require('./Handler/showHandler.js');
const Authenticator = require('./Middleware/authentication.js');
const Authorization = require('./Middleware/authorization.js');
const roles = require('./db/constants/roles.js');

require('dotenv').config();

let clusterURL = "cluster0.0gxi2te.mongodb.net";
let dbName = "Netflix";
let username = process.env.MONGODB_USERNAME;
let password = process.env.MONGODB_PASSWORD;
let dbURL = `mongodb+srv://${username}:${password}@${clusterURL}/${dbName}`;

mongoose.connect(dbURL)
.then(()=>console.log("MongoDB Connection established successfully"))
.catch((err)=>console.log(err));

app.use(express.json());

app.get('/', function(req,res){
    res.send("Hello World! from node.js backend");
});

app.post('/', Authenticator.CheckIfAuthenticated, Authorization.checkIfAuthorized([roles.ROLE_CUSTOMER]), function(req, res){
    res.status(200).send('You are Logged in!');
});

app.post('/user', UserHandler.SignUpHandler);

app.post('/user/profile', Authenticator.CheckIfAuthenticated,
    Authorization.checkIfAuthorized([roles.ROLE_CUSTOMER]), function(req,res){
        UserHandler.addNewProfile;
    });

app.post('/login', AuthHandler.login);

app.post('/logout', Authenticator.CheckIfAuthenticated, 
Authorization.checkIfAuthorized([roles.ROLE_USER, roles.ROLE_CUSTOMER]), AuthHandler.logout);

app.get('/show/showId', Authenticator.CheckIfAuthenticated, 
Authorization.checkIfAuthorized([roles.ROLE_CUSTOMER, roles.ROLE_USER]), ShowHandler.getShowById);

app.post('/show/:showId/:seriesId', Authenticator.CheckIfAuthenticated,
Authorization.checkIfAuthorized([roles.ROLE_CUSTOMER, roles.ROLE_USER]), ShowHandler.findSeriesByKey);

app.get('/show/:showId/series/:seriesId/video/:videoId/link', Authenticator.CheckIfAuthenticated,
Authorization.checkIfAuthorized([roles.ROLE_CUSTOMER]), ShowHandler.findVideoLink);

app.post('/show/:showId/series/:seriesid/video/:videoId/watchHistory', Authenticator.CheckIfAuthenticated,
Authorization.checkIfAuthorized([roles.ROLE_CUSTOMER]), UserHandler.updateWatchHistory);

app.get('/show/:showId/series/:seriesid/video/:videoId/watchHistory', Authenticator.CheckIfAuthenticated,
Authorization.checkIfAuthorized([roles.ROLE_CUSTOMER]), UserHandler.getWatchHistory)

app.listen(4000, function(){
    console.log("Server started on port 4000");
});