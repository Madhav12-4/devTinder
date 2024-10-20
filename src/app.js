const express = require('express');

const app = express();

app.get("/user", (req, res, next) => {
    console.log("Motherland or Death");
    req.sachin = "Sachin";  // Setting a custom property on the request object
    next();                 // Passing control to the next middleware
},(req,res,next) => {
    console.log("Hard things about hard things");
    next();
    // res.send( req.sachin);
},(req,res,next) => {
    console.log("Iska matlab ye hai ki jo request object hai wo aage paas hote rehta hai agar aage bhi next likh denge to ye fallback route me jayega aur yahi req ke saath matlab aage ")
    res.send("Bas khel liya jitna khelna tha matlab kuch points note karne wali hai ki agar ek baar response chala gaya fir aapne next kiya hai to connection closed ho jaata hai to dobara response nahi bhej sakte isliye agar aapne next likha hai but aage ke request handler functions nahi hai ya hai to bhi ye error dega k iek baar response ja chuka hai ab nahi bhejenge")
    // next();
});

app.use((req, res,next) => {
    next();
    res.send(req.sachin);   // Send "Sachin" as the response body
});

app.listen(7777, (err) => {
    if (err) console.log(err);
    console.log("listening on port jo bhi ho abhi 7777 hai");
});
