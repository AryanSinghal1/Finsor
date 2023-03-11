const express = require("express");
const {registerUser, loginUser} = require('../controllers/userController')
const router = express.Router();
// router.route("/authenticate").get(authenticateUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// router.route("/pass").post(setPassword);
module.exports = router;