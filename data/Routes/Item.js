const express = require("express");
const router = express.Router();
const db = require("./item-model");
const authentication = require("../middleware/authenticate-middleware");

router.get('/:id', authentication, async (req, res, next) => {
    try{
      const results = await db.find(req.params.id)
      res.json(results);
    }
    catch(err){
        next(err);
    }
})

router.post('/:id', authentication, async (req, res, next) => {
    try{
        const {itemName, itemType, price, itemdesc, imageURL} = req.body;
        const ownerID = req.params.id;
        if(!itemName, !itemType, !ownerID, !price, !itemdesc){
            res.status(500).json({errorMessage: "You need an more information to proceed!"});
        }else{
        await db.create(itemName, itemType, price, itemdesc, ownerID, imageURL);
        res.json("You've successfully created a new item!");
        }
    }catch(err){
        next(err);
    }
})

router.get("/items", async (req,res, next) => {
    try{
       const item = await db.findAll();
       res.json(item);
    }catch(error){
        next(error);
    }
})

module.exports = router;