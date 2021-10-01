const express = require("express");
const router = express.Router();
const User = require("../models/User.model")
const mongoose = require("mongoose")

//<-----------------ROUTE TO GET ALL USERS -------------------------------------------------------------------------------------------------------->

router.get("/user/", (req, res) => {
    User.find()
    .then(userArray=>res.json(userArray))
    .catch(err => console.log(err))
})

//<-----------------ROUTE TO GET USER BY ID -------------------------------------------------------------------------------------------------------->

router.get( "/user/:id" , (req, res) =>{

    const {id} = req.params  //<----------------GETING ID INFO FROM URL PARAMS ------------------------------------------------------------------->

    User.findById(id)
    .then(user => res.json(user))
    .catch(err => console.log(err))
})


//<-----------------ROUTE TO UPDATE USERS -------------------------------------------------------------------------------------------------------->

router.put( "/user/:id", (req,res) =>{

    const {id} = req.params  //<----------------GETING ID INFO FROM URL PARAMS ------------------------------------------------------------------->
    const {username, password, email, address, birthdate, sex, tel } = req.body  //<------------REACT CONTROLED FORM INFO STORED---------------->

    User.findByIdAndUpdate(id, {username, password, email, address, birthdate, sex, tel }, {new:true})
    .then(userUpdated => console.log(userUpdated) )
    .catch(err => console.log(err))
})


//<-----------------ROUTE TO UPDATE USERS -------------------------------------------------------------------------------------------------------->

router.delete("/user/:id", (req, res) =>{

    const {id} = req.params  //<----------------GETING ID INFO FROM URL PARAMS ------------------------------------------------------------------->

    User.findByIdAndDelete(id)
    .then(userDeleted => console.log(userDeleted))
    .catch(err => console.log(err))
})


module.exports = router