const router = require("express").Router();
const Category = require("../models/Category");

// read all categorys
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

// read 1 category by Id
router.get("/:categoryId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create 1 category
router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update 1 category by Id
router.put("/:categoryId", async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete 1 category by Id
router.delete("/:categoryId", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200).json("The category has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
