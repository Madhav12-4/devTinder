const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth")

requestRouter.post("/sendConnectionRequest", userAuth,async (req,res) => {

    const user = req.user;


    res.send(user.firstName + "Connection Request Successful");
})


module.exports = requestRouter;