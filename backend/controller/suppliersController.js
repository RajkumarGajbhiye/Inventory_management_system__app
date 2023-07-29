const Supplier = require("../models/suppliersModel.js");
const catchErrorAsync = require("../utils/catchErrorAsync.js");

//get supplier:

const getSuppliers = catchErrorAsync (async(req,res)=>{
const data = await Supplier.find();
res.json({
    status:"success",
    result:data.length,
    data
});
})

//get single supplier:
const getSingleSupplier = catchErrorAsync(async(req,res)=>{
    const data = await Supplier.findById(req.params.id);
    if(!data){
        return next(new ApplicationError('Supplier id is not available'));
       
    }
    res.json({
        status:"success",
        data
    })
    })

//insert supplier:

const insertSuppliers = catchErrorAsync(async(req,res)=>{
 const task = await Supplier.create(req.body);
 res.status(201).json({
    status:"success",
    data:task
 });
})

//update supplier:

const updateSuppliers = catchErrorAsync(async(req,res)=>{
    const data = await Supplier.findByIdAndUpdate(req.body._id,{$set:req.body},{new:true});
    res.status(201).json({
        status:"success",
        data
    });
})

//delete supplier:

const deleteSuppliers = catchErrorAsync(async(req,res)=>{
    const data = await Supplier.deleteOne({_id:req.body._id});
    res.json({
        status:"success",
        data
    });
})


module.exports = {getSuppliers,insertSuppliers,updateSuppliers,deleteSuppliers,getSingleSupplier};