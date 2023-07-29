const mongoose = require("mongoose");

//create schema
const orderSchema = new mongoose.Schema({
  order_item: {
    type: String,
    required: [true, "Oder Item Name is required"],
  },
  order_date: {
    type: Date,
    default: Date.now()
  
  },
  quantity: {
    type: Number,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  totalPrice:{
    type: Number,
    required: true,
  },
  supplier: {
    type: String,
  },
  
  orderId:{
    type: String,
   
  },
});

//set model:
const Order = mongoose.model("order", orderSchema, "orders");

module.exports = Order;
