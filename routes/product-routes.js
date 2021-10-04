const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require ("../models/Product.model")

//<-----------------ROUTE TO LIST ALL THE PRODUCTS-------------------------------------->

router.get("/product", (req, res) => {

	Product.find ()
		.then((allProducts) => res.json(allProducts))
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

//<-----------------ROUTE TO GET PRODUCTS BY CATEGORY-------------------------------------->

router.get("/product/category/:category", (req, res) => {
	console.log("category: ", req.params)
	let {category} = req.params;

	Product.find ({categories: category})
		.then((productsByCategory) => {
			res.json(productsByCategory)
			console.log("productsByCategory: ", productsByCategory)}
			)
		.catch((err) => res.json(err))
})

//<-----------------ROUTE TO GET PRODUCTS BY SEARCH-------------------------------------->

router.get("/product/search/:searchData", (req, res) => {
	console.log("search: ", req.params)
	let {searchData} = req.params;

	Product.find( { $or:[ {name: { "$regex": `${searchData}`, "$options": "i" }}, {description: { "$regex": `${searchData}`, "$options": "i" }}]} )
		.then((productsBySearchData) => {
			console.log("productsBySearch: ", productsBySearchData)
			res.json(productsBySearchData)}
			)
		.catch((err) => res.json(err))
})

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

router.delete("/product/:productId", (req, res) => {
	const { productId } = req.params;
	console.log("DELETEEEEE ROUTE", productId)
	

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

