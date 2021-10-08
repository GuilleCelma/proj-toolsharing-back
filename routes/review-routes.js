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
            Product.findByIdAndUpdate(productId,{
                $push:{reviews: newReview._id}
            }, {new:true})
            .then(reviewedProduct => {

                let newAverageRating = (reviewedProduct.averageRating + rating) / (reviewedProduct.reviews.length)

                Product.findByIdAndUpdate(productId,{
                    $push:{averageRating: newAverageRating}
                },{new:true})
                .then(()=>{
                    
                    Product.findById(productId)
                        .populate("reviews")
                        .then(result => { 
                            result.reviews.map(review =>{ oldRating.push(review.rating)
                                
                            })
                            console.log("resultado reviews:")
                
                        });
                })
            })
            
            
            
            res.json(newReview)
        })
        
        .catch((err) => res.json(err));
    


        })



module.exports = router;