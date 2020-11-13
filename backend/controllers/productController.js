const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// Fetch all products    
//@route  GET /api/products
const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({})
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
        name: 'Sample name',
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


module.exports = { getProducts, getProductById, deleteProduct, createProduct, editProduct }