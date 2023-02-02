const authService = require('../service/authService');

function login(req,res){
    const { email, password } = req.body;
    return authService.login(email,password)
    .then((output)=>{
        if(output.statusCode === 200){
            res.status(200).send(output.token);
        }
        else if(output.statusCode !== 200){
            res.status(output.statusCode).send('Login failed!');
        };
    })
    // .then(()=>res.status(400).send('Login successful!'))
    .catch((error)=>console.log(error));
};

function logout(req, res){

    authService.logout()
    .then(()=>{
        res.status(200).send('Logged out successfully');
    })
    .catch(error=> {
        console.log(error);
        res.status(500).send(error);
});

}
module.exports = {

    login,
    logout

};