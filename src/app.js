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



