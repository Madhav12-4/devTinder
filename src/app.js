const express = require('express');
const app = express();

const { connectDB } = require("./config/database");
const User = require("./models/user")

app.use(express.json());

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

app.post("/signup" , async (req,res) => {

    
    console.log(req.body);
    
    const user = new User(req.body)
    // Agar data bhejte samay db me kisi field ka spelling galat ho jaye to us field me data nahi jata hai
    try {
        await user.save()
        res.send("User Saved Successfully")
    } catch(err ) {
        res.status(400).send("Error saving the user" + err.message);
    }
    
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
        res.status(400).send("Error updating the user");
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



