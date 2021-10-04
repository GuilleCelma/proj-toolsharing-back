const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction.model")
const mongoose = require("mongoose")

//<-----------------ROUTE TO GET ALL USERS -------------------------------------------------------------------------------------------------------->

router.get("/chat/:id", (req, res) => {
	console.log ("route chat")
	const {id} = req.params 
	Transaction.find( { $or:[ {renterId: id }, {ownerId: id} ]})
	.then((transactions) => {
		console.log("transactions: ", transactions)
		res.json()}
		)
	.catch((err) => res.json(err))
})

module.exports = router