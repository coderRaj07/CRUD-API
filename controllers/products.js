const Joi = require('joi');
const Product = require('../models/product');

// Define a schema for your product data
const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  featured: Joi.boolean().default(false),
  rating: Joi.number().default(4.9),
  company: Joi.string().valid('apple', 'samsung', 'dell', 'mi').default('apple'),
});

// Define a separate schema for query parameters
const querySchema = Joi.object({
  company: Joi.string().valid('apple', 'samsung', 'dell', 'mi'),
  name: Joi.string().optional(),
  featured: Joi.boolean().optional(),
  sort: Joi.string().optional(),
  select: Joi.string().optional(),
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
});

const getAllProducts = async (req, res) => {
  try {
 // const { company, name, featured, sort, select } = req.query;
    const { company, name, featured, sort, select, page, limit } = Joi.attempt(
      req.query,
      querySchema
    );
    
    console.log("🚀 ~ file: products.js ~ line 5 ~ getAllProducts ~ sort", sort);
      
    const queryObject = {};

    if (company) {
      queryObject.company = company;
    }

    if (featured) {
      queryObject.featured = featured;
    }

    if (name) {
      queryObject.name = { $regex: name, $options: 'i' };
    }

    let apiData = Product.find(queryObject);

    if (sort) {
      let sortFix = sort.split(",").join(" ");
      apiData = apiData.sort(sortFix);
    }
  
    // (select = name company;
    if (select) {
      // let selectFix = select.replace(",", " ");
      let selectFix = select.split(",").join(" ");
      apiData = apiData.select(selectFix);
    }
  
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
  
    let skip = (page - 1) * limit;
  
    // page = 2;
    // limit = 3;
    // skip =  1 * 3 = 3
  
    apiData = apiData.skip(skip).limit(limit);
  
    console.log(queryObject);

    const Products = await apiData;
    res.status(200).json({ Products, nbHits: Products.length });
  } catch (error) {
    // Handle Joi validation errors here
    res.status(400).json({ error: error.details[0].message });
  }
};

const getAllProductsTesting = async (req, res) => {
  try {
    const myData = await Product.find(req.query).skip(2);
    res.status(200).json({ myData, nbHits: myData.length });
  } catch (error) {
    // Handle errors here
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { getAllProducts, getAllProductsTesting };
