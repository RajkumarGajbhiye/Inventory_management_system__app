const mongoose = require("mongoose")
var validator = require("validator");
const bcrypt = require("bcryptjs");

//create userschema:

const userSchema = new mongoose.Schema({
   firstname:{
    type:String,
    required:[true,'First Name is required']
   },
   lastname:{
    type:String,
    required:[true,'Last Name is required']
   },
   email: {
    type: String,
    required: [true, "Email required"],
    lowercase: true,
    validate: [validator.isEmail, 'Email formate incorrect'],
},
password:{
    type: String,
    required: [true, "Password required"],  
    minLength:8
},
passwordChangedAt:{
    type:Date,
    default:Date.now
},
company_name:{
    type:String,
    required:[true,'Company Name is required']
},

createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//pre middleware:

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) next()
    this.password = await bcrypt.hash(this.password,12);
    this. passwordChangedAt = Date.now() - 2000
    next()
})

//intance method for Compare Password:

userSchema.methods.verifyPassword = async function(userPassword,encryptedPassword){
 return await bcrypt.compare(userPassword,encryptedPassword);
}

//instance method for invalidateTokens:
userSchema.methods.invalidateTokens =  function(tokeniat){
    if(this.passwordChangedAt){
        const tokenTimeStamp = new Date(tokeniat*1000)
        return this.passwordChangedAt > tokenTimeStamp
    }
    return false
}


//set model:

const User = mongoose.model('user',userSchema,'users');

module.exports = User