const mongoose = require("mongoose");
var validator = require('validator');
const suppliersSchema =new mongoose.Schema({
        company:{
            type:String,
            required:[true,'company name is required']  
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
        address:{
            type:String,
            required:[true,'addrerss is required']  
        },
        country: {
            type: String,
            required: true,
        },
        added_on:{
            type: Date,
            default: Date.now(), 
        },
    
    });
    
    //set model:
    const Supplier = mongoose.model('supplier',suppliersSchema,'suppliers')
    
    module.exports = Supplier