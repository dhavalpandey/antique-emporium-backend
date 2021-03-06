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
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const Product = require('../models/product');
router.post('/signup', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    if ((yield !name) || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in empty fields ' });
    }
    if ((yield password) !== password2) {
        errors.push({ msg: 'The passwords do not match' });
    }
    if ((yield password.length) < 6) {
        errors.push({ msg: 'The password must have at least 6 characters' });
    }
    if ((yield errors.length) > 0) {
        res.status(200).json({ success: true, message: "signned up succesfully!" });
    }
    else {
        User.findOne({ email: email })
            .then(user => {
            if (user) {
                errors.push({ msg: 'Email is already in use' });
                res.status(400);
            }
            else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err)
                        throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                        res.status(300).json({ success: true });
                    })
                        .catch(err => console.log(err));
                }));
            }
        });
    }
}));
module.exports = router;
//# sourceMappingURL=registrationRoutes.js.map