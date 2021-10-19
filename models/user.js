const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const user = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
      trim: true,
      maxlength: [
        40,
        'A user must have name less or equal then 40 characters'
      ],
      minlength: [
        3,
        'A user must have name more or equal then 3 characters'
      ]
    },
    userName: {
      type: String,
      required: [true, 'A user must have a username'],
      trim: true,
      maxlength: [
        10,
        'A user must have username less or equal then 10 characters'
      ],
      minlength: [
        4,
        'A user must have username more or equal then 4 characters'
      ]
    },
    password: {
      type: String,
      required: [true, 'A user must have a name'],
      minlength: [
        8,
        'A user name must have password more or equal then 8 characters'
      ]
    },
    wishlist: [{ type: ObjectId, ref: "Product" }],
    orders: [{
      product: { type: ObjectId, ref: "Product" },
      count: Number,
      time: { type: Date, default: Date.now },
      price: Number
    }],
    addresses: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
  }
);

const Product = mongoose.model('Product', user);
module.exports = Product;
