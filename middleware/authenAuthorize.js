const jwt = require('jsonwebtoken');
const userModel = require("../model/usersModel");
require("dotenv").config();

const userAuthenticate = async(req, res, next)=>{
    let token ;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try{
            token = req.headers.authorization.split(" ")[1];

            const verifiedToken = jwt.verify(token, process.env.JWT_KEY);

            req.user = await userModel.findById(verifiedToken.id);

            next()

        }catch(error){
            return res.status(401).json({
                message: "Auth failed"
              });
        }
    }
    if(!token){
        return res.status(401).json({
            message: "No token!"
          });
    }
}

module.exports = userAuthenticate;