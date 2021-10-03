const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");
const Product = require("../models/Product.model");

//<------------------RETRIEVES A ESPECIFIC REVIEW BT ID------------------------------->

router.get("/review/:id", (req, res) => {
    console.log("hey")
	const { id } = req.params;
    console.log ("/reviw: ", id ) 

    Review.findById(id)
	    .populate('product')
        .populate('user')
	    .then((review) => {
		  	res.status(200).json(review)})
	    .catch((error) => {
			console.log("error: ", error)
			res.json(error)}
			);
});

//<------------------???????????????????????????------------------------------->

router.post("/review", (req,res,next)=>{
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