const { products, nextId } = require("../store");

function list(req, res) {
  res.json(products);
}

function get(req, res) {
  const id = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
}

function create(req, res) {
  const { name, price, description } = req.body;
  if (!name || typeof price !== "number")
    return res.status(400).json({ error: "name and numeric price required" });
  const product = {
    id: nextId("products"),
    name,
    price,
    description: description || "",
  };
  products.push(product);
  res.status(201).json(product);
}

function update(req, res) {
  const id = parseInt(req.params.id, 10);
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: "Product not found" });
  const { name, price, description } = req.body;
  products[idx] = {
    ...products[idx],
    ...(name && { name }),
    ...(price !== undefined && { price }),
    ...(description && { description }),
  };
  res.json(products[idx]);
}

function remove(req, res) {
  const id = parseInt(req.params.id, 10);
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: "Product not found" });
  const [deleted] = products.splice(idx, 1);
  res.json(deleted);
}

module.exports = { list, get, create, update, remove };
