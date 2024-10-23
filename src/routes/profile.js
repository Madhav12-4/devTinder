const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth")

profileRouter.get("/profile", userAuth, async (req,res) => {
    try {
        const user = req.user;
        
        res.send(user + " Aawaz deke dekh lo shayad wo mil hi jaye warna ye umar bhar ka safar raidan to hai");
    } catch (err) {
        res.status(400).send("Invalid token: " + err.message);
    }
})


module.exports = profileRouter;