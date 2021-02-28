if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
require('./config/passport')(passport);
const json = require('./data/products');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
connectDB();
const PORT = process.env.PORT || 5000;
let corsOptions = {
    origin: 'https://antique-emporium.netlify.app/',
    optionsSuccessStatus: 200
};
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
app.use('/api', productRoutes);
app.use('/', require('./routes/registrationRoutes.js'));
app.use('/', require('./routes/loginRoutes.js'));
app.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ message: 'you are logged in!' });
    }
    else {
        res.status(401).json({ message: "you must log in" });
    }
});
app.get('*', (req, res) => {
    res.redirect("https://antique-emporium.netlify.app/shop");
});
app.listen(PORT, console.log(`Server running at port ${PORT}`));
//# sourceMappingURL=app.js.map