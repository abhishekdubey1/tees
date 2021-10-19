const mongoose = require('mongoose');

const product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true,
      maxlength: [
        40,
        'A product name must have less or equal then 40 characters'
      ],
      minlength: [
        3,
        'A product name must have more or equal then 10 characters'
      ]
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price']
    },
    category: [String],
    color: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    image: {
      type: String,
      default: "",
      required: true
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be above 0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
  }
);

const Product = mongoose.model('Product', product);
module.exports = Product;
