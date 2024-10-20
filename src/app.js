const express = require('express');
const app = express();

const { connectDB } = require("./config/database");
const User = require("./models/user")

app.post("/signup" , async (req,res) => {
    const userObj = {
        firstName: "Jahnavi",
        lastName: "Banotra",
        emailId: "jahnaviaiimsd@gmail.com",
        password: "Jahnavi@123"
    }

    const user = new User(userObj)
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



