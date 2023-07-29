const express = require("express");
const {displayBuyers,getSingleBuyers,insertBuyers,updateBuyers,deleteBuyers} = require("../controller/buyersController.js");
const {protect} = require("../controller/userController.js")

const router = express.Router();

router.route('/api/v1/buyers').get(displayBuyers).post(protect,insertBuyers).patch(protect,updateBuyers).delete(protect,deleteBuyers);
router.route('/api/v1/buyers/:id').get(getSingleBuyers)
module.exports = router;