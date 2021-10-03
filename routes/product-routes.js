const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require ("../models/Product.model")

//<-----------------ROUTE TO LIST ALL THE PRODUCTS-------------------------------------->

router.get("/product", (req, res) => {

	Product.find ()
		.then((allProjects) => res.json(allProjects))
		.catch((err) => res.json(err))
})

//<-----------------ROUTE TO CREATE A NEW PRODUCT-------------------------------------->

router.post("/product", (req, res) => {
	const { name, description, amount, photo, ownerId, categories, adquisitionYear } = req.body;

	Product.create({ name, description, amount, photo, ownerId, categories, adquisitionYear, reviews: [] })
	  .then((response) => res.json(response))
	  .catch((err) => res.json(err));
});

//<------------------RETRIEVES A ESPECIFIC PRODUCT BT ID------------------------------->

router.get("/product/:id", (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
	  res.status(400).json({ message: "Specified id is not valid" });
	  return;
	}
  
	// Each product document has `reviews` array holding `_id`s of Review documents
	// We use .populate() method to get swap the `_id`s for the actual Review documents

	Product.findById(id)
	    .populate('reviews')
	    .then((product) => {
		  	res.status(200).json(product)})
	    .catch((error) => {
			res.json(error)}
			);
});

//<-----------------ROUTE TO UPDATE A PRODUCT-------------------------------------->

router.put("/product/:id", (req, res) => {
	const { productId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(productId)) {
	  res.status(400).json({ message: "Specified id is not valid" });
	  return;
	}
  
	Product.findByIdAndUpdate(productId, req.body, { new: true })
	  .then((updatedProduct) => res.json(updatedProject))
	  .catch((error) => res.json(error));
  });

//<-----------------ROUTE TO DELETE A PRODUCT-------------------------------------->

router.delete("/product/:id", (req, res) => {
	const { productId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(productId)) {
	  res.status(400).json({ message: "Specified id is not valid" });
	  return;
	}
  
	Product.findByIdAndRemove(productId)
	  .then(() =>
		res.json({
		  message: `Project with ${productId} is removed successfully.`,
		})
	  )
	  .catch((error) => res.json(error));
});

module.exports = router;

