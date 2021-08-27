const router = require("express").Router();
const Product = require("../models/Product");

// read all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products.reverse());
    } catch (err) {
        res.status(500).json(err);
    }
});

// read 1 product by Id
router.get("/:productId", async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create 1 product
router.post("/", async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update 1 product by Id
router.put("/:productId", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete 1 product by Id
router.delete("/:productId", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.productId);
        res.status(200).json("The product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
