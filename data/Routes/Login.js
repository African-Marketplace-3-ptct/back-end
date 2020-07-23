const express = require("express");
const LM = require("./Login-model.js");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
    try{
    const {username, password} = req.body;
    const user = await LM.Find(username);
    if(!user || !bcrypt.compareSync(password, user[0].password)){
        res.status(500).json({errorMessage: "invalid user!"});
    }else{
        res.status(200).json(`Welcome ${user[0].username}`);
    }
}catch(error){
    next(error);
}
})

module.exports = router;