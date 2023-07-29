const config = require("./config.js");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const globalErrorHandling = require("./controller/errorController.js");
const authRouter = require("./routes/userRoute.js");
const productRouter = require("./routes/productRoute.js");
const buyerRouter = require("./routes/buyerRoute.js");
const suppliersRouter = require("./routes/suppliersRoute.js");
const orderRouter = require("./routes/orderRoute.js")
const paymentRouter = require("./routes/paymentRoute.js");


//here we connect mongoose

const DB_Connection_String = process.env.DATABASE_CONNECTION_STRING.replace(
    "<mongodb_user>",
    process.env.DATABASE_USERNAME
).replace(
    "<mongodb_password>",
    process.env.DATABASE_PASSWORD 
)

mongoose.set("strictQuery",false)
mongoose.connect(DB_Connection_String,{
    useNewUrlParser : true
}).then(con=> console.log("Database connection established....."))


const app =  express();

app.use(cors());
app.use(express.json());
app.use('/auth',authRouter);
app.use('/productsDetails',productRouter);
app.use('/buyerDetails',buyerRouter);
app.use('/suppliersDetails',suppliersRouter);
app.use('/admin',orderRouter);
app.use('/api',paymentRouter);
app.use(globalErrorHandling);




//create port
const port = process.env.PORT || 1000

app.listen(port,()=> console.log(`listening to ${port}.....`))

