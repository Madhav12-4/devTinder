const express = require('express');

const app = express();


 
    
    app.use("/hello", (req, res, next) => {
        req.data = {
            firstname: "Jahnavi",
            lastname: "Banotra",
            age: 24,
            city: "Delhi"
        };
        next(); // Move to the next middleware
    });
    
    app.use((req, res) => {
        if (req.data) {
            res.send(req.data); // Send the JSON if data exists from previous middleware
        } else {
            res.send("agar main res, aur req ka naaame change karke use karu toh");
        }
    });

    app.listen(7777, (err) => {
        if(err) console.log(err);
        console.log("listening on port jo bhi ho abhi 7777 hai");
    })
