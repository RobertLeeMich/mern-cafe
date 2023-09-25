// Connect to the database
require('dotenv').config();
const db = require('./config/database.cjs');

//need to close DB connection after connecting it
// setTimeout(() => {
//     db.close()
// }, 5000)

// Require the Mongoose models
// const User = require('./models/user');
// const Item = require('./models/item');
// const Category = require('./models/category');
const Order = require('./models/order.cjs');

// Local variables will come in handy for holding retrieved documents
let user, item, category, order;
let users, items, categories, orders;

//Example Order
Order.create({
    user: "650a1155973a97a937ece356",
    isPaid: true,
    lineItems: [
      {
        qty: 5,
        item: {
          name: 'Hamburger',
          emoji: '🍔',
          price: 5.95,
        }
      },
      {
        qty: 2,
        item: {
          name: 'Turkey Sandwich',
          emoji: '🥪',
          price: 6.95,
        }
      }
    ]
  }).then((order) => {
    console.log(order)
  }).finally(() => {
    db.close()
  })