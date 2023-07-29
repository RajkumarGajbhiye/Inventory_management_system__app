const express = require("express");
const {getProducts,getSingleProduct,insertProducts,updateProducts,deleteProducts}= require("../controller/productController.js");
const {protect} = require("../controller/userController.js")
const router = express.Router();

router.route('/api/v1/products').get(getProducts).post(protect,insertProducts).patch(protect,updateProducts).delete(protect,deleteProducts);

router.route('/api/v1/products/:id').get(getSingleProduct)
module.exports = router;