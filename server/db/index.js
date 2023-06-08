//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')
const OrdersProducts = require('./models/orders-products');
const UserProducts = require('./models/user-products')

//associations could go here!
Order.belongsToMany(Product, {through: OrdersProducts});
User.hasMany(Order);
User.belongsToMany(Product, {through: UserProducts});

Product.belongsToMany(Order, {through:OrdersProducts});
Order.belongsTo(User);
Product.belongsToMany(User, {through: UserProducts});

OrdersProducts.belongsTo(Order);
OrdersProducts.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrdersProducts,
    UserProducts
  },
}
