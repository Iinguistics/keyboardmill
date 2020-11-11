const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, registerUser, updateUserProfile, getAllUsers, deleteUser, getUserProfileEdit, editUserProfile } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMilldeWare');

router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/register", registerUser);
router.get('/',protect,admin, getAllUsers);
router.delete('/remove/:id', protect,admin, deleteUser);
router.get("/profile/edit/:id", protect,admin, getUserProfileEdit);
router.put("/profile/edit/:id", protect,admin, editUserProfile);



module.exports = router;