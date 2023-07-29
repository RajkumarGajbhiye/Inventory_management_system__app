const express = require("express");
const {getSuppliers,getSingleSupplier,insertSuppliers,updateSuppliers,deleteSuppliers} = require("../controller/suppliersController.js");
const {protect} = require("../controller/userController.js")
const router = express.Router();

router.route('/api/v1/suppliers').get(getSuppliers).post(protect,insertSuppliers).patch(protect,updateSuppliers).delete(protect,deleteSuppliers);
router.route('/api/v1/suppliers/:id').get(getSingleSupplier)

module.exports = router;