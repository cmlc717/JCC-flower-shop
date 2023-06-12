const router = require('express').Router()
const { current } = require('@reduxjs/toolkit');
const { models: { User, Product, UserProducts }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});

router.post('/saveMyCart/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.params.userId}, include: {model: Product}});
    let products = req.body.cart;
    const productObjects = await Promise.all(products.map(async(array) => {
      let productObj = await Product.findOne({where: {id: array[0]}});
      return productObj;
    }));

    await user.addProducts(productObjects);
    await user.update({products: productObjects});
    await user.save();

    const currentCart = await UserProducts.findAll({where: {userId: req.params.userId}});
    for (let i = 0; i < currentCart.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (currentCart[i].dataValues.productId === products[j][0]) {
          await currentCart[i].update({productQty: products[j][1]});
          await currentCart[i].save();
        }
      }
    }

    res.json(currentCart)
  } catch (ex) {
    next(ex);
  }
});

router.get('/getMyCart/:userId', async (req, res, next) => {
  try {
    const currentCart = await UserProducts.findAll({where: {userId: req.params.userId}, include: {model: Product}});
    res.json(currentCart);
  } catch (ex) {
    next(ex);
  }
});
