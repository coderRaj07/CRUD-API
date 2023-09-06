/*

Author: Rajendra Bisoi
Date Written: 4th SEP 2023
Purpose: Script to insert all data into database and clear the old data
Components: DB
Dependency: None

*/

require("dotenv").config();
const {get} = require('lodash');
const Q = require('q');
const connectDB = require("../db/connect");
const Product = require("../models/product");
const ProductJson = require("../products.json");

const start = async () => {
  const deferred = Q.defer();
  try {
    console.log(process.env.MONGODB_URL)
    await connectDB(process.env.MONGODB_URL);
    await Product.deleteMany();
    await Product.create(ProductJson);
    console.log("success");
    deferred.resolve();
  } catch (error) {
    deferred.reject(error);
  }
  return deferred.promise;
};

start();
