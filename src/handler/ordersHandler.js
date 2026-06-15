const { orders, users, products, nextId } = require("../store");

function list(req, res) {
  res.json(orders);
}

function get(req, res) {
  const id = parseInt(req.params.id, 10);
  const order = orders.find((o) => o.id === id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
}

function create(req, res) {
  const { userId, items } = req.body; // items: [{ productId, quantity }]
  if (!userId || !Array.isArray(items) || items.length === 0)
    return res.status(400).json({ error: "userId and items required" });
  const userExists = users.some((u) => u.id === userId);
  if (!userExists) return res.status(400).json({ error: "Invalid userId" });

  let total = 0;
  const detailed = items.map((it) => {
    const product = products.find((p) => p.id === it.productId);
    if (!product) throw new Error(`Product ${it.productId} not found`);
    const qty =
      typeof it.quantity === "number" && it.quantity > 0 ? it.quantity : 1;
    const lineTotal = product.price * qty;
    total += lineTotal;
    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      lineTotal,
    };
  });

  const order = {
    id: nextId("orders"),
    userId,
    items: detailed,
    total,
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  res.status(201).json(order);
}

function remove(req, res) {
  const id = parseInt(req.params.id, 10);
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return res.status(404).json({ error: "Order not found" });
  const [deleted] = orders.splice(idx, 1);
  res.json(deleted);
}

module.exports = { list, get, create, remove };
