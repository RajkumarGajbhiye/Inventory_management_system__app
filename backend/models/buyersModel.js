const mongoose = require("mongoose");
var validator = require('validator');

//create schema:

const buyersSchema = new mongoose.Schema({
    buyerCompany: {
        type: String,
        required: [true, "Company Name is mandatory"],
    },
    email: {
        type: String,
        required: [true, "Email required"],
        lowercase: true,
        validate: [validator.isEmail, 'Email formate incorrect'],
    },
    mobile_no: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    added_on:{
        type: Date,
        default: Date.now(), 
    }
});

//set model:
const Buyers = mongoose.model("buyer", buyersSchema, "buyers");

module.exports = Buyers;
