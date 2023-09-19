const router = require('express').Router();
const { models: { Order, Product, User, OrdersProducts, UserProducts }} = require('../db');
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

router.post('/orderMyCart/guest', async (req, res, next) => {
  try {
    //get all products
    let products = req.body.productsArray;
    const productObjects = await Promise.all(products.map(async(array) => {
      let productObj = await Product.findOne({where: {id: array[0]}});
      return productObj;
    }));

    //add products to order
    const newOrder = await Order.create({number: req.body.number,total: req.body.total, tax: req.body.tax, date: req.body.date})
    for (let i = 0; i < productObjects.length; i++) {
      await productObjects[i].addOrder(newOrder);
      await productObjects[i].update({order: newOrder});
      await productObjects[i].save();
    }

    //adjust the quantity of each product on the order
    const currentOrderProducts = await OrdersProducts.findAll({where: {orderId: newOrder.id}});

    for (let i = 0; i < currentOrderProducts.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (currentOrderProducts[i].dataValues.productId === products[j][0]) {
          await currentOrderProducts[i].update({productQty: products[j][1]});
          await currentOrderProducts[i].save();
        }
      }
    }

    res.json(currentOrderProducts);
  } catch (ex) {
    next(ex);
  }
});

router.post('/orderMyCart/:userId', async (req, res, next) => {
  try {
    //get user and products
    const user = await User.findOne({where: {id: req.params.userId}, include: {model: Product}});
    let products = req.body.productsArray;
    const productObjects = await Promise.all(products.map(async(array) => {
      let productObj = await Product.findOne({where: {id: array[0]}});
      return productObj;
    }));

    //add products to order
    const newOrder = await Order.create({number: req.body.number,total: req.body.total, tax: req.body.tax, date: req.body.date})
    for (let i = 0; i < productObjects.length; i++) {
      await productObjects[i].addOrder(newOrder);
      await productObjects[i].update({order: newOrder});
      await productObjects[i].save();
    }
    await user.addOrder(newOrder);

    //update quantities of all products
    const currentOrderProducts = await OrdersProducts.findAll({where: {orderId: newOrder.id}});

    for (let i = 0; i < currentOrderProducts.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (currentOrderProducts[i].dataValues.productId === products[j][0]) {
          await currentOrderProducts[i].update({productQty: products[j][1]});
          await currentOrderProducts[i].save();
        }
      }
    }

    clearCart(req.params.userId);

    res.json(currentOrderProducts);
  } catch (ex) {
    next(ex);
  }
});

async function clearCart(userId) {
  let userProducts = await UserProducts.findAll({where: {userId: userId}});
  await userProducts.forEach((userProduct) => userProduct.destroy());
}