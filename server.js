const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// eslint-disable-next-line no-console
const print = console.log.bind(console);

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  print('Server connected to mongoDb');
});
// mongoose.connection.on('error', error => {
//   print(`
// 	**************************************************************************
// 	Error is:
// 	${error}
// 	**************************************************************************
// 	`);
// });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  print(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('Error: ' + err.name);
  console.log('Message: ' + err.message);
  server.close(a => {
    process.exit(1);
  });
});
