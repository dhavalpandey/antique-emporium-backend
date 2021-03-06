var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, getAll } = require('../controller/productControllers');
const Product = require('../models/product');
router.get('/products', getAllProducts);
router.get('/:id', getProductById);
router.put('/new', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const insertProduct = [{
            name: "Test product 123",
            imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
            description: "test product 123",
            price: 200,
            countInStock: 1,
        }];
    yield Product.insertMany(insertProduct);
    res.status(201);
    console.log("Successfully added a new product to the database!");
}));
module.exports = router;
//# sourceMappingURL=productRoutes.js.map