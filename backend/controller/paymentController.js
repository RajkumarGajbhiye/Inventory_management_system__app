const catchErrorAsync = require("../utils/catchErrorAsync.js");
const Razorpay = require("razorpay");
var crypto = require("crypto");
const Payment = require("../models/paymentModel.js")

//secret data of Razorpay
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const checkout = catchErrorAsync(async (req, res, next) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);
  //console.log(order);
  res.status(200).json({
    status: "success",
    order,
  });
});

const paymentVerification = (req,res) => {
  let body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  var response = { signatureIsValid: "false" };
  if (expectedSignature === req.body.response.razorpay_signature)
    response = { signatureIsValid: "true" };
  res.send(response);
};




module.exports = {checkout,paymentVerification};
