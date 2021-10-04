const product = [
  {
    color: 'grey',
    name: 'Licensed Steel Fish',
    price: '972.00',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support'
  },
  {
    color: 'grey',
    name: 'Licensed Steel Fish',
    price: '972.00',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support'
  },
  {
    color: 'grey',
    name: 'Licensed Steel Fish',
    price: '972.00',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support'
  },
  {
    color: 'grey',
    name: 'Licensed Steel Fish',
    price: '972.00',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support'
  },
  {
    color: 'grey',
    name: 'Licensed Steel Fish',
    price: '972.00',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support'
  },
  {
    color: 'grey',
    name: 'Licensed Steel Fish',
    price: '972.00',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support'
  },
  {
    color: 'grey',
    name: 'Licensed Steel Fish',
    price: '972.00',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support'
  },
  {
    color: 'grey',
    name: 'Licensed Steel Fish',
    price: '972.00',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support'
  },
  {
    color: 'grey',
    name: 'Licensed Steel Fish',
    price: '972.00',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support'
  },
  {
    color: 'grey',
    name: 'Licensed Steel Fish',
    price: '972.00',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support'
  }
];
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModels');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('DB connection successful!'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Product.create(product);
    // eslint-disable-next-line no-console
    console.log('Data successfully loaded!');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
// eslint-disable-next-line no-unused-vars
const deleteData = async () => {
  try {
    await Product.deleteMany();
    // eslint-disable-next-line no-console
    console.log('Data successfully deleted!');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  process.exit();
};

// if (process.argv[2] === '--import') {
importData();
// } else if (process.argv[2] === '--delete') {
//   deleteData();
// }
