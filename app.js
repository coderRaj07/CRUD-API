require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();
const connectDB = require("./db/connect");
const { sendSuccessResponse, sendErrorResponse } = require("./handleResponse");
const PORT = process.env.PORT || 5000;



//----------------------------------/********* Two ways to define modularise routes *********/----------------------------------//



// 1. Provide router as a parameter

// Import the defineProductRoutes function and pass the required functions
const defineProductRoutes = require("./routes/products");

// Use the router for /api/products route by invoking the defineProductRoutes function
defineProductRoutes(router, sendSuccessResponse, sendErrorResponse);
app.use("/api/products", router); 
/*
The above line tells your Express application to use the router defined in the previous step for handling requests to the "/api/products" path.
In other words, any HTTP request that matches the "/api/products" path 
will be processed by the routes defined in the router you configured in the previous step.

For example, when a client sends an HTTP GET request to "/api/products", 
Express will route that request to the router you defined in defineProductRoutes. 
The routes within this router will handle the request and generate a response accordingly.
*/



// 2. Define router itself inside the routes folder

// Import the defineDetailsRoutes function and pass the required functions
const defineDetailsRoutes = require("./routes/productsV2")

// Use the router for /api/details route by invoking the defineDetailsRoutes function
const detailsRouter = defineDetailsRoutes(sendSuccessResponse, sendErrorResponse);
app.use("/api/details", detailsRouter);

//-------------------------------------------------------------------------------------------------------------------------------



app.get("/", (req, res) => {
  res.send("Hi, I am live ");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL); // Make sure to await connectDB
    app.listen(PORT, () => {
      console.log(`${PORT} Yes I am connected`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();

