const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Product = mongoose.model("product", productSchema);
module.exports = Product;
//# sourceMappingURL=product.js.map