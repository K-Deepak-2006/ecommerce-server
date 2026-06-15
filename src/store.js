const users = [];
const products = [];
const orders = [];

const counters = { users: 1, products: 1, orders: 1 };

function nextId(kind) {
  return counters[kind]++;
}

module.exports = {
  users,
  products,
  orders,
  nextId,
};
