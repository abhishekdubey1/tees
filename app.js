const express = require('express');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errController');
const AppError = require('./utils/appError');
const productRouter = require('./routes/productRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
let requestsCount = 0;
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  requestsCount += 1;
  console.log('Hello from the middleware 👋, request number: ', requestsCount);
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/products', productRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find the route: ${req.originalUrl} on this server`, 404)
  );
});

app.use(globalErrorHandler);
module.exports = app;
