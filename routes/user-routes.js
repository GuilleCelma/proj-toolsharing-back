const express = require("express");
const router = express.Router();
const User = require("../models/User.model")
const mongoose = require("mongoose")

//<-----------------ROUTE TO GET ALL USERS -------------------------------------------------------------------------------------------------------->

router.get("/user", (req, res) => {
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
    const {fullName, username, password, email, address, products, birthdate, sex, tel, profileImg } = req.body  //<------------REACT CONTROLED FORM INFO STORED---------------->

    User.findByIdAndUpdate(id, {fullName, username, password, email, address, birthdate, sex, tel, products, profileImg }, {new:true})
    .then(userUpdated => {
        res.json(userUpdated)
        console.log("userupdatedback" , userUpdated) })
    .catch(err => console.log("put error back", err))
})


//<-----------------ROUTE TO UPDATE USERS -------------------------------------------------------------------------------------------------------->

router.delete("/user/:id", (req, res) =>{

    const {id} = req.params  //<----------------GETING ID INFO FROM URL PARAMS ------------------------------------------------------------------->

    User.findByIdAndDelete(id)
    .then(userDeleted => console.log(userDeleted))
    .catch(err => console.log(err))
})

//<-----------------ROUTE TO ADD FAVORITES TO USERS -------------------------------------------------------------------------------------------------------->

router.post("/fav/:id", (req,res) => {
    const {id} = req.params
    const {userId} = req.body

    console.log('pepe:::::',id,userId)

    User.findById(userId)
      .then((result)=>{
          
          if(!result.favorites.includes(id)){
            User.findByIdAndUpdate(userId,{
                $push:{favorites: id}
            })
            .then((result)=>console.log('add to favorites:',result))
          } else { console.log('Already have this one')}
      })
    .then(result=>console.log('result:',result))
})


router.put("/fav/:id", (req,res) => {
    const {id} = req.params
    const {userId} = req.body
    let favoriteArray =[]
    console.log('user id:', userId)
    console.log('req:', req.body)

    User.findById(userId)
    .then((result)=>{
       console.log('estoy caliente:',result)
       let favoriteArray = result.data.favorites
       console.log('favorite array:', favoriteArray)
    })
    let filteredArray = favoriteArray.filter((favorite)=>{favorite !== id})
    console.log('filtered array:',filteredArray)

    User.findByIdAndUpdate(userId,{ favorites:filteredArray})
    .then((result)=>{
          
    
        console.log('remove from favorites:',result)
     })
    
})


module.exports = router