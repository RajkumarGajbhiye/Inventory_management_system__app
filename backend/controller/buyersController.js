const Buyers = require("../models/buyersModel.js");
const catchErrorAsync = require("../utils/catchErrorAsync.js");
//get buyers:

const displayBuyers = catchErrorAsync (async(req,res)=>{
const data = await Buyers.find();
res.json({
    status:"success",
    result:data.length,
    data
});
})

//get single buyers:
const getSingleBuyers = catchErrorAsync(async(req,res)=>{
    const data = await Buyers.findById(req.params.id);
    if(!data){
        return next(new ApplicationError('Buyer id is not available'));
       
    }
    res.json({
        status:"success",
        data
    })
    })

   
//insert buyers:

const insertBuyers = catchErrorAsync(async(req,res)=>{
 const task = await Buyers.create(req.body);
 res.status(201).json({
    status:"success",
    data:task
 });
})

//update buyers:

const updateBuyers = catchErrorAsync(async(req,res)=>{
    const data = await Buyers.findByIdAndUpdate(req.body._id,{$set:req.body},{new:true});
    res.status(201).json({
        status:"success",
        data
    });
})

//delete buyers:

const deleteBuyers = catchErrorAsync(async(req,res)=>{
    const data = await Buyers.deleteOne({_id:req.body._id});
    res.json({
        status:"success",
        data
    });
})

module.exports = {displayBuyers,getSingleBuyers,insertBuyers,updateBuyers,deleteBuyers}