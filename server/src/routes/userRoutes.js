const express = require("express");
const {registerUser, loginUser, advisorUser, getInvite, mailDetails, changeStatus, addLimit, addExpense, getExpense, getUser} = require('../controllers/userController')
const router = express.Router();
// router.route("/authenticate").get(authenticateUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getAdv").get(advisorUser);
router.route("/book").post(getInvite);
router.route("/status").post(changeStatus);
router.route("/meetDetails").get(mailDetails);
router.route("/addaLimit").post(addLimit);
router.route("/addDetail").post(addExpense);
router.route("/expense").get(getExpense);
router.route("/getUser").post(getUser);
// router.route("/pass").post(setPassword);
module.exports = router;