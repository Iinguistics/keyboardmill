const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, registerUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMilldeWare');

router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.post("/", registerUser);






module.exports = router;