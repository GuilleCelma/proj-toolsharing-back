const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: String,
    description: String,
    amount: Number,
    photo: String,
    ownerId: String,
    categories:[String],
    //Disponibilidad ?????
    adquisitionYear: String,
    reviews:[{
      type: Schema.Types.ObjectId,
      ref: "Review"
    }]
    
});

const Product = model("Product", productSchema);

module.exports = Product;