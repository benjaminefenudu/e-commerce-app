const express = require("express");
const app = express();

// Importing products data
let Products = require("./Models/Product");

const PORT = process.env.PORT || 3000;

// Parse json
app.use(express.json());

// =-=-=-= Read all product records =-=-=-=
app.get("/products/", (req, res) => {
  res.status(200).json({ success: true, data: Products });
});

// =-=-=-= Read single product record =-=-=-=
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  singleProduct = Products.find((product) => product.id === Number(id));
  // find product by id
  if (!singleProduct) {
    return res
      .status(404)
      .json({ success: false, msg: `No product with id ${id}.` });
  }
  return res.status(200).json({
    success: true,
    data: singleProduct,
  });
});

// =-=-=-= Create a new product =-=-=-=
app.post("/products/", (req, res) => {
  const Product = req.body;
  // if user omits any value, send bad request, with required values to provide
  if (
    !Product.name ||
    !Product.description ||
    !Product.image ||
    !Product.price
  ) {
    return res.status(400).json({
      sucess: false,
      msg: "Please provide product name, description, image and price.",
    });
  }
  let id = Products.length + 1; // create unique id
  const newProduct = { id, ...req.body };
  // add new product to end of products array
  Products.push(newProduct);
  return res.status(200).json({
    success: true,
    msg: `Product ${id} has been created.`,
    data: Products,
  });
});

// =-=-=-= Update a product record - Method 1 =-=-=-=
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  // find product by id, return 404 if not found
  product = Products.find((product) => product.id === Number(id));
  if (!product) {
    return res
      .status(404)
      .json({ success: false, msg: `No product with id ${id}.` });
  }
  // find index of selected product
  const index = Products.indexOf(product);
  const updatedProduct = { ...product, ...req.body };
  // modify product at that index of the array
  Products[index] = updatedProduct;
  return res.status(200).json({
    success: true,
    msg: `Product ${id} has been updated.`,
    data: Products,
  });
});

// // =-=-=-= Update a product record - Method 2 =-=-=-=
// app.put("/products/:id", (req, res) => {
//   const { id } = req.params;
// // find product by id, return 404 if not found
//   product = Products.find((product) => product.id === Number(id));
//   if (!product) {
//     return res
//       .status(404)
//       .json({ success: false, msg: `No product with id ${id}.` });
//   }
// // find and modify specified product
//   Products = Products.map((product) => {
//     if (product.id === Number(id)) {
//       product = { ...product, ...req.body };
//     }
//     return product;
//   });
//   return res.status(200).json({
//     success: true,
//     msg: `Product ${id} has been updated.`,
//     data: Products,
//   });
// });

// =-=-=-= Delete a product =-=-=-=
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  // find product by id
  const deleteProduct = Products.find((product) => product.id === Number(id));
  if (!deleteProduct) {
    return res
      .status(404)
      .json({ success: false, msg: `No product with id ${id}.` });
  }
  // create new array with all products except the specified product
  Products = Products.filter((product) => product.id !== Number(id));
  return res.status(200).json({
    success: true,
    msg: `Product ${id} has been deleted.`,
    data: Products,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
