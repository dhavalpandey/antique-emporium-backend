if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const passport: any = require('passport');
const session: any = require('express-session');
const flash = require('connect-flash');

//files
require('./config/passport')(passport);
const json = require('./data/products');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes')
connectDB();

const PORT = process.env.PORT || 5000;
const SECRET = process.env.SECRET;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const redis = require('redis')
const client = redis.createClient()
const cache = require('memory-cache');

let corsOptions = {
  origin: 'https://antique-emporium.netlify.app/',
  optionsSuccessStatus: 200
}

let limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10 // limit each IP to 2 requests per minute
});

//Cache
let memCache = new cache.Cache();
let cacheMiddleware = (duration: number) => {
  return (req: any, res: any, next: any) => {
      let key =  '__express__' + req.originalUrl || req.url
      let cacheContent = memCache.get(key);
      if(cacheContent){
          res.send( cacheContent );
          return
      }else{
          res.sendResponse = res.send
          res.send = (body: any) => {
              memCache.put(key,body,duration*1000);
              res.sendResponse(body)
          }
          next()
      }
  }
}

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(limiter);

app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

app.use((req: any, res: any, next: any) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/api', productRoutes);
app.use('/' , require('./routes/registrationRoutes.js'));
app.use('/' , require('./routes/loginRoutes.js'));

app.get('/status', (req: any, res: any) => {
  if(req.isAuthenticated()) {
    res.json({message: 'you are logged in!'})
  } else {
    res.status(401).json({message: "you must log in"})
  }
})

app.listen(PORT, console.log(`Server running at port ${PORT}`))