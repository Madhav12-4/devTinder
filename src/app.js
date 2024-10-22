const express = require('express');
const bcrypt = require('bcrypt');
const {validateSignUpData} = require("./utils/validate");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { connectDB } = require("./config/database");
const User = require("./models/user")
const {userAuth} = require("./middlewares/auth")

const app = express();





app.use(express.json());
app.use(cookieParser());

app.get("/user",async (req,res) => {
    const userEmail = req.body.emailId;

    try {
        // agar hum yahan findOne ke me email Id ki jagah kuch na paas karein toh ye random user la ke de dega
        const user = await User.findOne({emailId: userEmail});
        if(!user)
        {
            res.status(404).send("User not found")
        }
        else{
            console.log(user)
            res.send(user);
        }
    } catch(err) {
        res.status(400).send("Something went wrong")
    }
})

app.get("/feed",async (req,res) => {
    try{
        const users = await User.find({emailId: req.body.emailId})

        if(users.length === 0)
        {
            res.status(404).send("No user with this emailId found")
        }
        else{
            res.send(users);
        }
    } catch(err) {
        res.status(400).send("Something went wrong")
    }
})

app.post("/login", async (req,res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId});
        if(!user){
            throw new Error("Invalid Credentials")
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(isPasswordCorrect){

            const token = await jwt.sign({_id: user._id},"PrivateKey", {expiresIn : "7d"});

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

app.post("/signup" , async (req,res) => {

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

app.get("/profile", userAuth, async (req,res) => {

    
    try {
       
        const user = req.user;
        console.log(user);
        
        res.send(user + " Aawaz deke dekh lo shayad wo mil hi jaye warna ye umar bhar ka safar raidan to hai");
    } catch (err) {
        res.status(400).send("Invalid token: " + err.message);
    }
})

app.post("/sendConnectionRequest", userAuth, (req,res) => {
    res.send("Connection Request Successful")
})

app.delete("/user",async (req,res) => {
    const userId = req.body.userId;

    try{
        const user = await User.findByIdAndDelete(userId)
        console.log(user);
        res.send("User deleted successfully")
    }
    catch{
        res.status(400).send("Error deleteting the user",+ err.message);
    }
})

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["userId","age","gender","photoUrl","about","skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
        )
        if(!isUpdateAllowed) {
            throw new Error("Update not Allowed")
        }
        
        const user = await User.findOneAndUpdate(
            { emailId: req.body.emailId },
            data,
            { upsert: true, new: true, runValidators: true } // upsert=false to avoid creating new docs, new=true to return the updated document
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).send(user);
    } catch (err) {
        res.status(400).send("Error updating the user " + err.message);
    }
});



connectDB().then(() =>{
    console.log("Connected to the database devTinder")
    app.listen(7777, (err) => {
        if (err) console.log("nahi");
        console.log("listening on port 7777");
    });
})
.catch(err => {
    console.log(err.message);
})



