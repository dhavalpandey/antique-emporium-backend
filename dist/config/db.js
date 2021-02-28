var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require('mongoose');
const connectDB = () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.info("Connection to MongoDB succeeded.");
    }
    catch (error) {
        console.error("There was an error: ", error);
    }
});
mongoose.set('useCreateIndex', true);
module.exports = connectDB;
//# sourceMappingURL=db.js.map