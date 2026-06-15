const { users, nextId } = require("../store");

function list(req, res) {
  res.json(users);
}

function get(req, res) {
  const id = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

function create(req, res) {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ error: "name and email required" });
  const user = { id: nextId("users"), name, email };
  users.push(user);
  res.status(201).json(user);
}

function update(req, res) {
  const id = parseInt(req.params.id, 10);
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return res.status(404).json({ error: "User not found" });
  const { name, email } = req.body;
  users[idx] = {
    ...users[idx],
    ...(name && { name }),
    ...(email && { email }),
  };
  res.json(users[idx]);
}

function remove(req, res) {
  const id = parseInt(req.params.id, 10);
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return res.status(404).json({ error: "User not found" });
  const [deleted] = users.splice(idx, 1);
  res.json(deleted);
}

module.exports = { list, get, create, update, remove };
