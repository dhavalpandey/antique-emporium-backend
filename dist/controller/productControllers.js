var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Product = require('../models/product');
const getAllProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const products = yield Product.find({});
        res.json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Error.' });
    }
});
const getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const product = yield Product.findById(req.params.id);
        res.json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Error.' });
    }
});
module.exports = {
    getAllProducts,
    getProductById,
};
//# sourceMappingURL=productControllers.js.map