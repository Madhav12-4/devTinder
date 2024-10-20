const express = require('express');
const {adminAuth, userAuth} = require('./middlewares/auth.js');

const app = express();

app.use("/user", userAuth)

app.get("/admin",adminAuth,(req,res) => {
    req.send("Soraho singar sajal sorahe baris me ");
})

app.get("/user/getAllData", (req,res,next) => {
    res.send(req.body);
})



app.listen(7777, (err) => {
    if (err) console.log(err);
    console.log("listening on port jo bhi ho abhi 7777 hai");
});
