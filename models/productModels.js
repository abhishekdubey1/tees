const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    images: [String],
    color: {
      type: String,
      trim: true,
      maxlength: [15, 'A color must have less or equal then 15 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A product must have a description']
    },
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
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    slug: String,
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

productSchema.virtual('category').get(function() {
  return 'FMCG';
});

// DOCUMENT MIDDLEWARE
productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productSchema.post('save', function(doc, next) {
  // console.log(doc);
  next();
});

// QUERY MIDDLEWARE
productSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

productSchema.post(/^find/, function(next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

//AGGREGATION MIDDLEWARE
productSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
