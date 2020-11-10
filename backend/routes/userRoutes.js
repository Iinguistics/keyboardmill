const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, registerUser, updateUserProfile, getAllUsers, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMilldeWare');

router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/register", registerUser);
router.get('/',protect,admin, getAllUsers);
router.delete('/remove/:id', protect,admin, deleteUser);





module.exports = router;