
// Controller is process for CRUD (data access layer)
const config = require('../config/config')
const axios = require('axios');
var User = require('../models/User');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');



function validateEmailAccessibility(email){
    return User.findOne({email: email}).then(function(result){
         return result !== null;
    });
}


function registerUser(data)
{   
    return new Promise(function(resolve, reject){
        
        var hashedPassword = bcrypt.hashSync(data.password, 8);


        validateEmailAccessibility(email)
        .then(function(valid) {
            if (!valid) {
                reject({
                    auth: false, 
                    msg: "Email already used"
                })
            }
        }).then(function (status){

                var user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    age: data.name,
                    name : data.name,
                    email : data.email,
                    password : hashedPassword    
                });
            
                user.save(function(err) {
                    if (err)  {
                        reject ({
                            status:500,
                            msg:"There was a problem registering the user."
                        })
                    }
        
        
                var token = jwt.sign(
                        { id: user._id }, 
                        config.secret, 
                        { expiresIn: 86400 // expires in 24 hours
                    });
                    
                    resolve({
                        auth: true, 
                        token: token
                    })
                });
        });

        
    })
}
  
function me(token)
{   
    return new Promise(function(resolve, reject){
    
        if (!token) {
            reject({
                code:404, 
                auth: false, 
                message: 'No token provided.' }
            )
        }
        
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                reject({
                    err:401, 
                    auth: false, 
                    message: 'Failed to authenticate token.'
                })
            }
            
            resolve({
                user: decoded
            });
        });

    })
}



function accessToken()
{   
    return new Promise(function(resolve, reject){
        //  get the first  data from monggo
        Biodata.findOne({}, function(error, data) {
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

 module.exports.validateEmailAccessibility = validateEmailAccessibility;
module.exports.registerUser = registerUser;
module.exports.me = me;