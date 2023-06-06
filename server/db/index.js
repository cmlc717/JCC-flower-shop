//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')

//associations could go here!
Order.belongsToMany(Product, {through: "orders-products"});
User.hasMany(Order);
User.belongsToMany(Product, {through: "user-products"});

Product.belongsToMany(Order, {through: "orders-products"});
Order.belongsTo(User);
Product.belongsToMany(User, {through: "user-products"});

module.exports = {
  db,
  models: {
    User,
    Product,
    Order
  },
}
