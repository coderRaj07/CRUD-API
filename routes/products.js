// Import controllers
const {
  getAllProducts,
  getAllProductsTesting,
} = require("../controllers/products");

// Define a function that defines the product-related routes
const defineProductRoutes = (router, sendSuccessResponse, sendErrorResponse) => {
  // Define route for getting all products
  router.route("/").get(async (req, res) => {
    try {
      const products = await getAllProducts(req,res);
      sendSuccessResponse(req, res, products);
    } catch (error) {
      sendErrorResponse(req, res, error);
    }
  });

  // Define route for getting products for testing
  router.route("/testing").get(async (req, res) => {
    try {
      const testingProducts = await getAllProductsTesting(req,res);
      sendSuccessResponse(req, res, testingProducts);
    } catch (error) {
      sendErrorResponse(req, res, error);
    }
  });
};

module.exports = defineProductRoutes;



// const express = require("express");
// const router = express.Router();

// const {
//   getAllProducts,
//   getAllProductsTesting,
// } = require("../controllers/products");

// router.route("/").get(getAllProducts);
// router.route("/testing").get(getAllProductsTesting);

// module.exports = router;
