const express = require('express');
const app = express();

const { connectDB } = require("./config/database");
const User = require("./models/user")

app.use(express.json());

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



