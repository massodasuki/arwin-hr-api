
// Controller is process for CRUD (data access layer)

const axios = require('axios');
var User = require('../models/User');
var mongoose = require('mongoose');


function createUser(data)
{   
    return new Promise(function(resolve, reject){
        //  get the first  data from monggo
        console.log(data);
        var user = new User({
            _id: new mongoose.Types.ObjectId(),
            age: data.name,
            // sex: req.body.sex,
            // bmi: req.body.bmi,
            // smoker: req.body.smoker,
            // region: req.body.region,
            // charge: req.body.charge
            });
    
        user.save(function(err) {
            if (err) throw err;
                 
            console.log('Author successfully saved.');
            resolve({status:200, msg:'Author successfully saved'})
        });
    })
}


function getUser()
{   
    return new Promise(function(resolve, reject){
        
        // TODO : get user data base username

        User.findOne({}, function(error, data) {
            if (data){
                resolve({status:200, data:data})
            }
            else if (error)
            {
                console.log(error)
                reject({status:404})
            }
        });
    })
}

function updateUser()
{   
    return new Promise(function(resolve, reject){
        
        // TODO : update user field base username

        User.findOne({}, function(error, data) {
            if (data){
                resolve({status:200, data:data})
            }
            else if (error)
            {
                console.log(error)
                reject({status:404})
            }
        });
    })
}

function deleteUser()
{   
    return new Promise(function(resolve, reject){
        
        // TODO : Delete user base on username

        User.findOne({}, function(error, data) {
            if (data){
                resolve({status:200, data:data})
            }
            else if (error)
            {
                console.log(error)
                reject({status:404})
            }
        });
    })
}



module.exports.createUser = createUser;
module.exports.createUser = getUser;
module.exports.createUser = updateUser;
module.exports.createUser = deleteUser;
