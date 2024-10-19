const express = require('express');

const app = express();

        app.use("/test",(req,res) => {
            res.send(`is nadi ki dhar se se thandhi hawa aati to hai <br> naav jarjar hi sahi lehro se takrati toh hai <br> ek chingari kahin se dhoondh lao dost <br> is diye me tel se doobi hui baati to hai`);
            
        })

        app.get("/user", (req,res) => {
            res.send({
                firstname: "Jahnavi",
                lastname: "Banotra",
                city: "Delhi",
                college: "AIIMS"
            })
        })

        app.post("/user", (req,res) => {
            res.send("User updated successfully");
        })

        app.delete("/user", (req,res) => {
            res.send("User deleted Successfully Kuch database me call maroge ho jayega")
        })
        
        app.put("/user", (req,res) => {
            res.send("The difference between put and patch is that put replaces the thing in db while patch just make partial changes althogh put and patch both updates the db")
        })
         

        
        
        
        app.use((req, res) => {
            
        res.send("agar main res, aur req ka naaame change karke use karu toh");
        
    });

    app.listen(7777, (err) => {
        if(err) console.log(err);
        console.log("listening on port jo bhi ho abhi 7777 hai");
    })
