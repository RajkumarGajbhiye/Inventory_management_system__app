const express = require("express");
const {newOrder,displayOrder,deleteOrder} = require("../controller/orderController.js");
const {protect} = require("../controller/userController.js")
const router = express.Router();

router.route("/new/order").get(displayOrder).post(protect,newOrder).delete(protect,deleteOrder)


module.exports = router;

