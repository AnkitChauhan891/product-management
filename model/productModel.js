const { Timestamp } = require("bson");
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: String,
    description: String,
    price: {
        type: Number,
        min: 0,
        default: 0
    },
    stock: {
        type: Number,
        min: 0,
        default: 0
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("product", productSchema);