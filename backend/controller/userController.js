const User = require("../models/userModel.js");
const catchErrorAsync = require("../utils/catchErrorAsync.js");
const ApplicationError = require("../utils/ApplicationError.js");
const {authTokenCreation,authTokenVerification} = require("../utils/jwtTokenProcess.js")


//sign up:

const signUp = catchErrorAsync(async(req,res,next)=>{
const {
    firstname,
    lastname,
    email,
    password,
    company_name 
} = req.body;

const data = await User.create({
    firstname,
    lastname,
    email,
    password,
    company_name  
});


res.status(201).json({
    status:"successful Sign Up",
    data,
    
});

})


//sign in:

const signIn = catchErrorAsync(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ApplicationError('Please provide email and password',400));
    }
    const user = await User.findOne({email});
    if(!user || !(await user.verifyPassword(password,user.password))){
     return next(new ApplicationError('Incorrect credentials',401));
    }

    //create token
    const token = authTokenCreation(user._id);
    res.cookie('jwt',token,{
        expire:new Date(Date.now() + parseInt(process.env.JWT_EXPIRY) *24 * 60 * 60 * 1000),
    });
console.log(res.cookie)

    res.status(200).json({
        status:"successful Sign In",
        token
    });
})

//protected route

const protect = catchErrorAsync(async (req,res,next)=>{
  let token = ''
 
  if(req.headers?.authorization?.startsWith('Bearer ')){
token = req.headers.authorization.split(' ')[1]
  }
  if(!token){
    return next(new ApplicationError('Not authorized',401)) //401 means not authorised
  }
  const payload = await authTokenVerification(token)

  const userInfo = await User.findById(payload.id)

  if(!userInfo){
    return next(new ApplicationError('The user does not exist',401))
  }
if(userInfo.invalidateTokens(payload.iat)){ //iat mean issue at and this iat come from jwt package
return next(new ApplicationError('Login again',401))
}
req.user = userInfo
  next()
})


 
module.exports= {signUp,signIn,protect};