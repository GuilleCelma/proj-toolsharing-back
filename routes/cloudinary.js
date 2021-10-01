const router = require("express").Router()
const {cloudinary} = require("../config/cloudinary.config.js")

router.post( "/upload" , async (req,res)=>{


    try{

        const fileStr = req.body.data
        console.log(fileStr)
        const uploadedResponse = await  cloudinary.uploader.upload(fileStr, {
            upload_preset: "dev_setups"
        })
        console.log(uploadedResponse)
        res.json({msg:"funciona"})
    }catch(err){
        console.log(err)
        res.status(500).json({err:"upps no va tio"})
    }
})

module.exports=router