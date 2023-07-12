import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import Category from '../models/category.js';
import Cart from '../models/cart.js';
import Favotites from '../models/favorites.js';
import Product from '../models/product.js';
import SubCategory from "../models/SubCategory.js";
import product from "../models/product.js";
//Category//
router.post('/add_new_cat', async(req,res) => {
    const {categoryName} = req.body;
    const id = new mongoose.Types.ObjectId;

    const _category = new Category({
        _id: id,
        categoryName: categoryName
    })
    _category.save()
    .then(category => {
        return res.status(200).json({
            message: category
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error
        })
    })
})
router.get('/get_all_cat', async(req,res) => {
    Category.find()
    .then(categories => {
        return res.status(200).json({
            message: categories
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error
        })
    })
})
//SubCat//
router.post('/get_sub_cat_ById',async(req,res) => {
    const catId = req.body.id
    SubCategory.find({catId:catId})
    .then(subcat => {
        return res.status(200).json({
            message:subcat
        })
    })
    .catch( error => {
        return res.status(400).json({
            message: error
        })
    })
})
//Product//
router.post('/add_new_product', async(req,res) => {
    const {productName,productPrice,productImage,productDiscription,catId} = req.body;
    const id = new mongoose.Types.ObjectId;

    const _product = new Product({
        _id: id,
        productName: productName,
        productPrice: productPrice,
        productImage: productImage,
        productDiscription: productDiscription,
        SubcategoryId: catId
    })
    _product.save()
    .then(product => {
        return res.status(200).json({
            message: product
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error
        })
    })
})
router.post('/find_product_by_id', async(req,res) => {
    const catId = req.body.id
    Product.find({SubcategoryId:catId})
    .then(subcat => {
        return res.status(200).json({
            message:subcat
        })
    })
    .catch( error => {
        return res.status(400).json({
            message: error
        })
    })
   
})

//Favorites//
router.post('/add_fav', async(req,res) => {
    const id = req.body.id
    
    Favotites.find({productId:id})
    .then(re =>{
        if(re.length == 0){
            const _fv = new Favotites({
                _id: new mongoose.Types.ObjectId,
                productId: id
            })
            _fv.save()
            .then(r =>{
                console.log(r)
                return res.status(200).json({
                    message: 'added'
                })
            })
            .catch(er =>{
                console.log(er)
                return res.status(500).json({
                    message: er
                })
            })
        }
        else{
            console.log('already')
            return res.status(200).json({
                message: 0
            })
        }
    })
    .catch(er =>{
        return res.status(500).json({
            message: er
        })
    })
})

router.get('/get_favs',async(req,res)=>{
    Favotites.find()
    .then(async(re) =>{
        if(re.length == 0){
            return res.status(200).json({
                message: []
            })
        }
        else{
            const arr =[]
            for(var i in re){
                await product.findById(re[i].productId)
                .then(r =>{
                    arr.push(r)
                })
                .catch(er =>{
                    return res.status(500).json({
                        message: er
                    })
                })
            }
            return res.status(200).json({
                message: arr
            })
        }
    })
    .catch(er =>{
        return res.status(500).json({
            message: er
        })
    })
})

router.post('/del_fav',async(req,res)=>{
    const id = req.body.id;

    Favotites.deleteOne({productId: id})
    .then(re =>{
        return res.status(200).json({
            message: 'done'
        })
    })
    .catch(er =>{
        console.log(er)
        return res.status(500).json({
            message: 'idk its fucked'
        })
    })
})
//Cart//
router.post('/add_cart', async(req,res) => {
    const id = req.body.id
    
    Cart.find({productId:id})
    .then(re =>{
        if(re.length == 0){
            const _fv = new Cart({
                _id: new mongoose.Types.ObjectId,
                productId: id
            })
            _fv.save()
            .then(r =>{
                console.log(r)
                return res.status(200).json({
                    message: 'added'
                })
            })
            .catch(er =>{
                console.log(er)
                return res.status(500).json({
                    message: er
                })
            })
        }
        else{
            console.log('already')
            return res.status(200).json({
                message: 0
            })
        }
    })
    .catch(er =>{
        return res.status(500).json({
            message: er
        })
    })
})

router.get('/get_cart',async(req,res)=>{
    Cart.find()
    .then(async(re) =>{
        if(re.length == 0){
            return res.status(200).json({
                message: []
            })
        }
        else{
            const arr =[]
            for(var i in re){
                console.log(re[i])
                await product.findById(re[i].productId)
                .then(r =>{
                    arr.push(r)
                })
                .catch(er =>{
                    return res.status(500).json({
                        message: er
                    })
                })
            }
            return res.status(200).json({
                message: arr
            })
        }
    })
    .catch(er =>{
        return res.status(500).json({
            message: er
        })
    })
})

router.post('/del_cart',async(req,res)=>{
    const id = req.body.id;

    Cart.deleteOne({productId: id})
    .then(re =>{
        return res.status(200).json({
            message: 'deleted'
        })
    })
    .catch(er =>{
        console.log(er)
        return res.status(500).json({
            message: 'idk its fucked'
        })
    })
})

export default router;