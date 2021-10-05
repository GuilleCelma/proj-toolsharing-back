const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction.model")
const mongoose = require("mongoose")

//<-----------------ROUTE TO GET ALL TRANSACTIONS WHERE THE CHAT USER HAVE BEEN INVOLVED-------------------------------------------------------------------------------------------------------->

router.get("/chat/:id", (req, res) => {
	const {id} = req.params 
	console.log ("route chat, the id: ",id )
	console.log ("type of id: ", typeof id)
/* 	Transaction.find( { $or:[ {renterId: id }, {ownerId: id} ]})
 */	Transaction.find ()
	.populate ("ownerId")
	.populate ("renterId")
	.then((transactions) => {
		console.log("transactions: ", transactions)
		res.json(transactions)}
		)
	.catch((err) => {
		console.log("error: ", err)
		res.json(err)})
})

module.exports = router