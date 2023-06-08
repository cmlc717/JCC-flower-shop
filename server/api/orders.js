const router = require('express').Router();
const { models: { Order, Product, OrdersProducts }} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
})

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
})
