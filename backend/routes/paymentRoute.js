const express = require("express");
const {checkout,paymentVerification} = require("../controller/paymentController.js")

const router = express.Router();

router.route("/checkout").post(checkout)
router.route("/paymentVerification").post(paymentVerification)
module.exports = router;