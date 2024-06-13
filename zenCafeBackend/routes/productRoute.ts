const express = require("express");
const Product = require("../models/product.model.ts");
const router = express.Router();
const controller = require('../controllers/productController');

// connect to sse
router.get('/events', controller.sseTest);

// create a product
router.post('/', controller.createProduct);

// get all products
router.get('/', controller.getAllProducts);

// get product by id
router.get('/:id', controller.getProductById);

// update a product
router.put('/:id', controller.updateProductById);

// delete a product
router.delete('/:id', controller.deleteProductById);

module.exports = router;