const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, registerUser, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMilldeWare');

router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/register", registerUser);






module.exports = router;