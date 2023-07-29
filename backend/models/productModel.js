const mongoose = require("mongoose")

//create schema
const productSchema = new mongoose.Schema({
    item_id:{
        type:String,
        required:true, 
    },
item_name:{
    type:String,
    required:[true,'Item Name is mandatory'],
},
item_category:{
    type:String,
},
current_stock:{
    type:Number,
},
stock_value:{
    type:Number,
},
low_stock:{
    type:Number,   
},
excess_stock:{
    type:Number,   
},
data:{
    type:String,
},
unit:{
    type:String,
},
price:{
type:Number,
required:true,    
},
item_type:{
type:String,
},
hsn_code:{
    type:String,
    unique:true
},
status:{
    type:String,
}
});

//set model:
const Products = mongoose.model('product',productSchema,'products')

module.exports = Products