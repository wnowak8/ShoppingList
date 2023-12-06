const express = require("express");

const checkAuth = require("../middleware/checkAuth");

const item = require("../models/item");

const router = express.Router();

const ItemsController = require("../controllers/items");

router.get("/", ItemsController.items_get_all);

router.post("/", checkAuth, ItemsController.items_add_new);

router.get("/:id", ItemsController.items_get_by_id);

router.put("/:id", checkAuth, ItemsController.items_change);

router.delete("/:id", checkAuth, ItemsController.items_delete);

module.exports = router;
