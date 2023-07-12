import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productName: String,
    productPrice: Number,
    productImage: String,
    SubcategoryId: String,
    productDiscription: String
})

export default mongoose.model('Product',ProductSchema);