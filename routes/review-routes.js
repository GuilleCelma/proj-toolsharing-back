const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");
const Product = require("../models/Product.model");

router.post("/", (req,res,next)=>{
    const {content, rating, productId} = req.body;

    Review.create({content, rating, product: productId})
        .then((newReview)=>{
            Product.findByIdAndUpdate(projectId,{
                $push:{reviews: newReview._id}
            })
        })
        .then((result)=>{res.json(result)})
        .catch((err) => res.json(err));
});

module.exports = router;