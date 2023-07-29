const Products = require("../models/productModel.js");
const ApplicationError = require("../utils/ApplicationError.js");
const catchErrorAsync = require("../utils/catchErrorAsync.js");





//get products:

const getProducts = catchErrorAsync (async(req,res)=>{
const data = await Products.find();
res.json({
    status:"success",
    result:data.length,
    data
});
})

//insert products:

const insertProducts = catchErrorAsync(async(req,res)=>{
 const task = await Products.create(req.body);
 res.status(201).json({
    status:"success",
    data:task
 });
})

//get single product:
const getSingleProduct = catchErrorAsync(async(req,res)=>{
const data = await Products.findById(req.params.id);
if(!data){
    return next(new ApplicationError('Product id is not available'));
   
}
res.json({
    status:"success",
    data
})
})
//update products:

const updateProducts = catchErrorAsync(async(req,res)=>{
    const data = await Products.findByIdAndUpdate(req.body._id,{$set:req.body},{new:true});
    res.status(201).json({
        status:"success",
        data
    });
})

//delete products:

const deleteProducts = catchErrorAsync(async(req,res)=>{
    const data = await Products.deleteOne({_id:req.body._id});
    res.json({
        status:"success",
        data
    });
})


module.exports = {getProducts,getSingleProduct,insertProducts,updateProducts,deleteProducts}