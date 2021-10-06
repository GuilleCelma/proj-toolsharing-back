

const express = require("express");
const router = express.Router();
const { isAuthenticated } = require('../middleware/jwt.middleware.js');

const Transaction = require("../models/Transaction.model")
const User = require("../models/User.model")
const Product = require("../models/Product.model")


router.post("/transaction",isAuthenticated, (req, res, next ) =>{


const token = req.payload
const currentUser = token.id
const {_id, ownerId} = req.body.product
const {endDate} = req.body
const {startDate} = req.body
const {excludeDays} = req.body


const dateFormater = (str) =>{

    const startYear = str.slice(0,4);
    const startMonth = str.slice(5,7);
    const startDay = str.slice(8,10);
    
    return `${startDay}-${startMonth}-${startYear}`

}

let formatedStartDate = dateFormater(startDate)
let formatedEndtDate = dateFormater(endDate)



    Transaction.create({
        renterId:token._id, 
        ownerId:ownerId,
        startDate:formatedStartDate,
        endDate:formatedEndtDate,
        product:_id})
        
    .then(()=>{
        Product.findByIdAndUpdate(_id, {bookDates:{$push:{excludeDays}}})
    })
    .catch(err => console.log(err))


})

module.exports = router