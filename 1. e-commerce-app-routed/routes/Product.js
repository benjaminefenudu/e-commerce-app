const express = require("express");
const router = express.Router();

// Import route functions from route controller
const {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/Product");

// Setting routes for products CRUD processes
router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getSingleProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
