const express = require('express');
const cookieParser = require('cookie-parser');
const { connectDB } = require("./config/database");

const app = express();
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");


app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/",profileRouter);
app.use("/", requestRouter);




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



