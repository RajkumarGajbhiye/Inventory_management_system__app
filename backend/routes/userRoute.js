const express = require("express");
const {signUp,signIn} = require("../controller/userController.js");

const router = express.Router();

router.route('/api/v1/signUp').post(signUp);
router.route('/api/v1/signIn').post(signIn);

module.exports = router;