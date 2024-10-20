const express = require('express');
const app = express();

// Global error-handling middleware
// app.use((err, req, res, next) => {
//     console.log("error aayega");
//     res.status(500).send("error nahi aayeaa");
// });

// Route that throws an error
app.get("/user/getAllData", (req, res, next) => {
    try {
        throw new Error("jsdxn");  // Intentionally throwing an error
        res.send("error aa gaya bhago");  // This line won't be reached
    } catch (err) {
        next(err);  // Pass the error to the global error-handling middleware
    }
});

app.use("/",(err,req,res,next) => {
    res.status(500).send("sachin")
})

app.listen(7777, (err) => {
    if (err) console.log("nahi");
    console.log("listening on port 7777");
});
