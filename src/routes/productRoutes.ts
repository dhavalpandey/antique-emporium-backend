const express = require('express');
const router = express.Router();

const { getAllProducts, getProductById, getAll } = require('../controller/productControllers');
const Product = require('../models/product');

router.get('/products', getAllProducts);
router.get('/:id', getProductById);

router.put('/new', async (req, res) => {
    const insertProduct = [{
      name: "Test product 123",
      imageUrl:
          "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
        description:
          "test product 123",
        price: 200,
        countInStock: 1,
    }]
  
    await Product.insertMany(insertProduct);
  
    // User.findOne({ email: "test@test.com" })
    // .then(user => {
    //     console.log(user.id)
    //   })
    res.status(201)
    console.log("Successfully added a new product to the database!");
  })

module.exports = router;