const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
  renterId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  ownerId:{
    type: Schema.Types.ObjectId,
    ref: "User"
  }
  ,
  date: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  accepted: Boolean,
    
});

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;