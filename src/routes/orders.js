const express = require("express");
const router = express.Router();
const ctrl = require("../handler/ordersHandler");

router.get("/", ctrl.list);
router.post("/", (req, res) => {
  try {
    return ctrl.create(req, res);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
router.get("/:id", ctrl.get);
router.delete("/:id", ctrl.remove);

module.exports = router;
