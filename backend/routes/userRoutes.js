const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, registerUser, updateUserProfile, getAllUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMilldeWare');

router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/register", registerUser);
router.get('/',protect,admin, getAllUsers);






module.exports = router;