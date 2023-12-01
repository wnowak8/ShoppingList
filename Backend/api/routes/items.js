const express = require("express");

const checkAuth = require("../middleware/checkAuth");

// model produktu
const item = require("../models/item");

// wyciągam router
const router = express.Router();

const ItemsController = require("../controllers/items");

router.get("/", ItemsController.items_get_all);

router.post("/", ItemsController.items_add_new);
// router.post("/", checkAuth, ItemsController.items_add_new);

router.get("/:id", ItemsController.items_get_by_id);

router.put("/:id", ItemsController.items_change);
// router.put("/:id", checkAuth, ItemsController.items_change);

router.delete("/:id", ItemsController.items_delete);
// router.delete("/:id", checkAuth, ItemsController.items_delete);

module.exports = router;
