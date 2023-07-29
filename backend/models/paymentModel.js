const mongoose = require("mongoose")

//create schema
const paymentSchema = new mongoose.Schema({
    razorpay_payment_id:{
        type:String,
        required:true,
    },
    razorpay_order_id:{
        type:String,
        required:true,
    },
    razorpay_signature:{
        type:String,
        required:true,
    },
});

//set model:
const Payment = mongoose.model('payment',paymentSchema,'payments')

module.exports = Payment