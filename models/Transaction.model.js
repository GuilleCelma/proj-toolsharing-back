const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
  renterId: String,
  ownerId:[{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
  ,
  date: String,
  productId: String,
  accepted: Boolean,
    
});

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;