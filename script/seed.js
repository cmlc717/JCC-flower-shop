"use strict";

const {
  db,
  models: { User, Product, Order, OrdersProducts, UserProducts },
} = require("../server/db/index");
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123", type: "shopper", email: "cody@pug.org", address: "1 Fullstack Ave", cardNumber: 1234}),
    User.create({ username: "murphy", password: "123", type: "shopper", email: "murphy@snake.com", address: "44 Grace Hopper St", cardNumber: 55555 }),
    User.create({ username: "ren", password: "123", type: "shopper", email: "ren@chihuahua.edu", address: "1 Good Boi Dr", cardNumber: 4441 })
  ]);

  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: "roses",
      price: "20.00",
      description: "lots of roses",
      quantity: 1,
      imageUrl: 'https://i.odealarose.com/12/images/produits/valentine-s-day-red-roses-bouquet-ode-a-la-rose-550x550-37412.jpg'
    }),
    Product.create({
      name: "daisies",
      price: "10.00",
      description: "lots of daisies",      
      quantity: 1,
      imageUrl: 'https://i.odealarose.com/12/images/produits/therese-550x550-39701.jpg'
    }),
    Product.create({
      name: "tulips",
      price: "15.00",
      description: "lots of tulips",
      quantity: 1,
      imageUrl: 'https://i.odealarose.com/12/images/produits/chanel-550x550-39804.jpg'
    }),
    Product.create({
      name: "peonies",
      price: "30.00",
      description: "lots of peonies",
      quantity: 1,
      imageUrl: 'https://i.odealarose.com/12/images/produits/pink-peonies-and-roses-550x550-40306.jpg?_ga=2.143603317.1592709613.1686250970-469025691.1686250970'
    }),
    Product.create({ 
      name: "orchid", 
      price: "35.00", 
      description: "orchids",
      quantity: 1,
      imageUrl:'https://i.odealarose.com/12/images/produits/white-orchid-delivery-550x550-38206.jpg'
    }),
  ]);

  // Creating Orders
  const orders = await Promise.all([
    Order.create({ number: 1 }),
    Order.create({ number: 2 }),
    Order.create({ number: 3 }),
  ]);

  let date = new Date();
  users[0].addOrder(orders[0]); //order: 1, user: cody
  products[0].addOrder(orders[0]); //product: roses and daisies
  products[1].addOrder(orders[0]);
  await orders[0].update({total: 30, tax: 3, date: date.getDate()})

  users[1].addOrder(orders[1]); //oder: 2, user: murphy
  products[0].addOrder(orders[1]); //product: roses and daisies
  products[1].addOrder(orders[1]);
  await orders[1].update({total: 30, tax: 3, date: date.getDate()})


  users[1].addOrder(orders[2]); //oder: 2, user: murphy
  products[0].addOrder(orders[2]); //product: roses
  await orders[2].update({total: 20, tax: 2, date: date.getDate()})

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

if (module === require.main) {
  seed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
