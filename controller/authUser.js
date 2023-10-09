const jwt = require('jsonwebtoken');
const userModel = require('../model/usersModel');
const Joi = require('joi');
const validat = require('../middleware/validation');

const bcrypt = require('bcrypt');
require('dotenv').config();

// code for sign up and login of users

const userSignup = async(req, res) =>{
    const {first_name, last_name, email, password, isAuthor} = req.body

    const result = Joi.validate(req.body, validat.valUsers);
    if (result.error) {
      return res.status(400).send({error:result.error.details[0].message});
    }

    try{
        const user = await userModel.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            isAuthor:isAuthor
        })
        res.status(200).send({message: "user created successfully!", user})
    }
    catch(error){
        res.send(error)
    }
};

const userLogin = async(req, res) =>{
    const {email, password} = req.body;

    try{
        const result = Joi.validate(req.body, validat.valLogin);
    if (result.error) {
      return res.status(400).send({error:result.error.details[0].message});
    }

        const user = await userModel.findOne({email})

        if (!user){
            return res.status(400).send({message:"User not found! please register"})
        }

        const validateUser = await bcrypt.compare(password, user.password)

        if(!validateUser){
            return res.status(400).send({message: "Incorrect password"})
        }

        const userId = {
            id: user._id,
            email: user.email
        }
        const token = jwt.sign(userId, process.env.JWT_KEY, {expiresIn: '1h'} )
        return res.status(200).send({message: "Login successful!", token})
    }catch(error){
        res.send(error)
    }
}

module.exports = {userSignup, userLogin};