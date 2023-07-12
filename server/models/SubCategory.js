import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SabCategorySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    SubCategoryName: String,
    Image: String,
    catId: String
})

export default mongoose.model('SubCategories',SabCategorySchema);