/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the sales collection.
db.getCollection('sales').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);


use("ecom")
db.product.insertMany([
  {
    name: "Mechanical Keyboard",
    price: 2499,
    category: "Electronics",
    stock: 50,
    ratings: 4.8,
    tags: ["keyboard", "mechanical"],
    createdAt: new Date()
  },
  {
    name: "Gaming Laptop",
    price: 85999,
    category: "Electronics",
    stock: 30,
    ratings: 4.6,
    tags: ["gaming", "laptop"],
    createdAt: new Date()
  }
]);

db.orders.insertMany([
  {
    orderId: "ORD001",
    user: "John Doe",
    products: [
      {
        name: "Wireless Mouse",
        quantity: 1,
        price: 799
      },
      {
        name: "Mechanical Keyboard",
        quantity: 1,
        price: 2499
      }
    ],
    total: 3298,
    status: "Delivered",
    createdAt: new Date()
  },
  {
    orderId: "ORD002",
    user: "Jane Smith",
    products: [
      {
        name: "Gaming Laptop",
        quantity: 1,
        price: 85999
      }
    ],
    total: 85999,
    status: "Pending",
    createdAt: new Date()
  }
]);

db.product.insertMany([
  {
    name: "Wireless Mouse",
    price: 799,
    category: "Electronics",
    stock: 120,
    ratings: 4.5,
    tags: ["computer", "accessory", "wireless"],
    createdAt: new Date()
  }
]);
db.contacts.insertMany([
  {
    name: "Carol",
    phone: "9876533210",
    message: "I want to cancel my order.",
    createdAt: new Date()
  },
  {
    name: "Alice",
    phone: "9123456789",
    message: "Loved your website!",
    createdAt: new Date()
  },
  {
    name: "Bob",
    phone: "9988776655",
    message: "Do you have discounts on laptops?",
    createdAt: new Date()
  }
]);
db.orders.insertMany([
  {
    orderId: "ORD001",
    user: "John Doe",
    products: [
      {
        name: "Wireless Mouse",
        quantity: 1,
        price: 799
      },
      {
        name: "Mechanical Keyboard",
        quantity: 1,
        price: 2499
      }
    ],
    total: 3298,
    status: "Delivered",
    createdAt: new Date()
  },
  {
    orderId: "ORD002",
    user: "Jane Smith",
    products: [
      {
        name: "Gaming Laptop",
        quantity: 1,
        price: 85999
      }
    ],
    total: 85999,
    status: "Pending",
    createdAt: new Date()
  }
]);

db.product.updateOne(
  { name: "Wireless Mouse", price: 799 },
  { $set: { price: 7999 } }
);

db.contacts.deleteOne({ name: "Alice" })

db.orders.deleteMany({ status: "Delivered" })

db.products.createIndex({ name: 1 })

db.products.getIndexes()

db.products.find({ price: { $gt: 5000 } }).explain("executionStats")

db.orders.aggregate([
{ $group: { _id: null, totalRevenue: { $sum: "$total" } } }
])

db.orders.aggregate([
{ $group: { _id: "$status", totalOrders: { $sum: 1 } } }
])

db.products.createIndex({ name: 1 }) // Ascending index on 'name' field

db.products.getIndexes() // List all indexes on 'products' collection

db.stats()
db.serverStatus()
db.products.countDocuments()
db.products.drop()
db.products.renameCollection("items")