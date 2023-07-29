const Order = require("../models/orderModel.js")
const catchErrorAsync = require("../utils/catchErrorAsync.js");
const ApplicationError = require("../utils/ApplicationError.js");
const Razorpay = require('razorpay');

//create new order:

const newOrder = catchErrorAsync(async(req,res)=>{
   const reqOrder = await Order.create(req.body)
      res.status(201).json({
       status :"Order generated",
       reqOrder,
      }); 
})

//display order:

const displayOrder = catchErrorAsync(async(req,res)=>{
  const data = await Order.find();
  res.json({
      status:"success",
      result:data.length,
      data
})
})

//delete order:

const deleteOrder = catchErrorAsync(async(req,res)=>{
const data = await Order.deleteOne({_id:req.body._id})
res.json({
      status:"success",
      data
  });

})




module.exports = {newOrder,displayOrder,deleteOrder}


