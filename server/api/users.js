const router = require('express').Router()
const { models: { User, Product }} = require('../db')
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
    let array = req.body;
    (async (product) => await user.addProduct(product));

    res.json(user)
  } catch (ex) {
    next(ex);
  }
})
