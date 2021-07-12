const express = require("express");
const app = express();
app.use(express.json()); // Parse json

// Import all products CRUD processes from router
const Products = require("./routes/Product");

const PORT = process.env.PORT || 3000;

// Set base route to "localhost:PORT/products"...
app.use("/products", Products);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
