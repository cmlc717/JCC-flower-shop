const router = require('express').Router();
const { models: { Order, Product, User, OrdersProducts }} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async(req, res, next) => {
  try {
    const userOrders = await Order.findAll({where: {userId: req.params.userId}, include: {model: Product}});
    const ordersAndProducts = [];
    for (let i = 0; i < userOrders.length; i++) {
      ordersAndProducts.push(await OrdersProducts.findAll({where: {orderId: userOrders[i].dataValues.id}, include: {model: Product}}));
    }
    res.json(ordersAndProducts);
  } catch (err) {
    next(err);
  }
});

router.get('/orderDetails/:orderId', async(req, res, next) => {
  try {
    const order = await Order.findOne({where: {id: req.params.orderId}});
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.post('/orderMyCart/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.params.userId}, include: {model: Product}});
    let products = req.body.productsArray;
    const productObjects = await Promise.all(products.map(async(array) => {
      let productObj = await Product.findOne({where: {id: array[0]}});
      return productObj;
    }));

    const newOrder = await Order.create({number: req.body.number,total: req.body.total, tax: req.body.tax, date: req.body.date})
    for (let i = 0; i < productObjects.length; i++) {
      await productObjects[i].addOrder(newOrder);
      await productObjects[i].update({order: newOrder});
      await productObjects[i].save
    }
    
    const currentOrderProducts = await OrdersProducts.findAll({where: {orderId: newOrder.id}});

    for (let i = 0; i < currentOrderProducts.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (currentOrderProducts[i].dataValues.productId === products[j][0]) {
          await currentOrderProducts[i].update({productQty: products[j][1]});
          await currentOrderProducts[i].save();
        }
      }
    }

    res.json(currentOrderProducts)
  } catch (ex) {
    next(ex);
  }
})
