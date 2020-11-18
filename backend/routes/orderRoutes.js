const express = require('express');
const router = express.Router();
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered } = require('../controllers/orderController');
const { protect,admin } = require('../middleware/authMilldeWare');

router.post("/", protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.get("/", protect,admin, getOrders);
router.put("/:id/delivered", protect,admin, updateOrderToDelivered);




module.exports = router;