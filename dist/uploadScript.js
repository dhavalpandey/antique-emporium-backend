var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const productData = require("./data/products");
const connectDB = require("./config/db");
const Product = require("./models/Product");
connectDB();
const importData = () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield Product.deleteMany({});
        yield Product.insertMany(productData);
        console.log("Data Import Success");
        process.exit();
    }
    catch (error) {
        console.error("Error with data import", error);
        process.exit(1);
    }
});
importData();
//# sourceMappingURL=uploadScript.js.map