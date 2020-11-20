const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// Fetch all products    
//@route  GET /api/products
const getProducts = asyncHandler(async(req,res)=>{
    const keyword = req.query.keyword ? {
        name:{
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}


    const products = await Product.find({...keyword})
    res.json(products);
});


// Fetch single product  
//@route  GET /api/products/:id
 const getProductById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if(product){
       res.json(product);
    }else{
       res.status(404)
       throw new Error('Product not found')
    }
});


// Delete product
//@route  DELETE api/products/remove/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async(req,res)=>{
   const product = await Product.findByIdAndDelete(req.params.id);

   if(!product){
       res.status(404)
       throw new Error('Product not found');

   }else{
       res.json({ product });
   }
});


// Create a product
//@route  POST api/products
//@access Private/Admin
const createProduct = asyncHandler(async(req,res)=>{
    const product = new Product({
        name: 'New product',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    });
    
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
 });


 // UPDATE product 
//@route  PUT api/products/edit/:id
//@access Private/Admin
const editProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)

    if(product){
    product.name = req.body.name || product.name
    product.price = req.body.price || product.price
    product.image = req.body.image || product.image
    product.brand = req.body.brand || product.brand
    product.category = req.body.category || product.category
    product.countInStock = req.body.countInStock || product.countInStock
    product.numReviews = req.body.numReviews || product.numReviews
    product.description = req.body.description || product.description

    const updatedProduct = await product.save();
    res.json({ updatedProduct });
    
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
});



 // Create new review 
//@route  POST api/products/:id/reviews
//@access Private
const createProductReview = asyncHandler(async(req,res)=>{
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    
    if(product){
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
    if(alreadyReviewed){
        res.status(400)
        throw new Error('You have already reviewed this item');
    }
    
    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
    }

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, item)=> item.rating + acc, 0)
    / product.reviews.length;

    await product.save();
    res.status(201).json({message: 'Review addded'});
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
});


module.exports = { getProducts, getProductById, deleteProduct, createProduct, editProduct, createProductReview }