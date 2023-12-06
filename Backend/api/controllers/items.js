const Item = require("../models/item");

exports.items_get_all = async (req, res, next) => {
  try {
    const result = await Item.find();
    res.status(200).json({
      message: "List of items",
      info: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.items_add_new = async (req, res, next) => {
  try {
    const { name, category, quantity } = req.body;

    const newItem = new Item({ name, category, quantity });

    const savedItem = await newItem.save();

    res.status(201).json({
      message: "Item added successfully",
      info: savedItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.items_get_by_id = async (req, res, next) => {
  const itemId = req.params.id;

  try {
    const result = await Item.findById(itemId);

    if (!result) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item details for ID: " + itemId,
      info: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.items_change = async (req, res, next) => {
  const id = req.params.id;
  const updateItem = {
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
  };
  try {
    const result = await Item.findByIdAndUpdate(id, updateItem);
    updateItem._id = id
    if (!result) {
      return res.status(404).json({ message: "Item not found" });
    }
    res
      .status(200)
      .json({ message: "Update item with ID: " + id, info: updateItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.items_delete = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Item.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Delete item with ID: " + id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
