import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: String
})

export default mongoose.model('Cart',CartSchema);