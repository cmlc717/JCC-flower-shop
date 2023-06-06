const router = require('express').Router();
const { models: { Order, Product }} = require('../db');
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
    res.json(userOrders);
  } catch (err) {
    next(err);
  }
})
