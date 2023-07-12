import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoryName: String,
    Image: String
})

export default mongoose.model('Categories',CategoriesSchema);