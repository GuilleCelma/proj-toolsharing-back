const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username:String,
  password: String,
  birthdate: String,
  email: String,
  address:{
    street: String,
    number: String,
    city: String,
    postalCode: Number,
  },
  sex:{
    type: String,
    enum : ['Men','Women',"I prefer not to say"],
  },
  tel: Number,
  imgUrl: String,
  paymentMethod: String,
  products:[{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }],
  rentals:[{
    type: Schema.Types.ObjectId,
    ref: "Transaction"
  }],
  favorites:[{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }],
  
});

const User = model("User", userSchema);

module.exports = User;
