const express = require('express');
const router = express.Router();
const { getProducts, getProductById, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMilldeWare');


router.get("/", getProducts);
router.get("/:id", getProductById );
router.delete('/remove/:id', protect,admin, deleteProduct);






module.exports = router;