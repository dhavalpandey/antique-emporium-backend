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
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/User');
router.post('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User.findOne({ email }).lean();
    if (yield !user) {
        return res.status(401).json({ status: "error", error: 'Error! Credentials not found' });
    }
    if (yield bcrypt.compare(password, user.password)) {
        let userRole;
        if (user.role != 0) {
            userRole = "admin";
        }
        else {
            userRole = "visitor";
        }
        let defaultAccountDate = new Date(user.date);
        let accountCreationDate = defaultAccountDate.toLocaleDateString();
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            role: userRole,
            dateCreated: accountCreationDate
        }, JWT_SECRET);
        console.info("A new user has just signed in!");
        return res.status(200).json({ status: "OK", data: token });
    }
    res.status(401).json({ status: "error", error: 'Error! Credentials not found' });
}));
module.exports = router;
//# sourceMappingURL=loginRoutes.js.map