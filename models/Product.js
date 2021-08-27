const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        desc: { type: String },
        img: { type: String },
        price: { type: Number },
        category: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
