const express = require('express');
const User = require("../models/user");
const {validateSignUpData} = require("../utils/validate")
const bcrypt = require('bcrypt');

const authRouter = express.Router();

authRouter.post("/signup" , async (req,res) => {

    // Agar data bhejte samay db me kisi field ka spelling galat ho jaye to us field me data nahi jata hai
    try {
        validateSignUpData(req);
        const {firstName, lastName, emailId, password} = req.body;

        const passwordHash = await bcrypt.hash(password,10);
        
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
        await user.save()
        res.send("User Saved Successfully")
    } catch(err ) {
        res.status(400).send("Error saving the user " + err.message);
    }
    
})

authRouter.post("/login", async (req,res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId});
        if(!user){
            throw new Error("Invalid Credentials")
        }
        const isPasswordCorrect = await user.validatePassword(password);
        if(isPasswordCorrect){

            const token = await user.getJWT();

            res.cookie("token", token, { expires: new Date(Date.now() + 8*3600000)});
            res.send("Login Successful")
        }
        else{
            throw new Error("Invalid Credentials")
        }
    } catch(err ) {
        res.status(400).send("ERROR:  " + err.message);
    }
})

module.exports = authRouter;