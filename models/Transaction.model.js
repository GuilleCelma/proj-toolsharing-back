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
  startDate: String,
  endDate: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
 
    
});

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;