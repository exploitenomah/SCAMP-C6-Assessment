const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv')
dotenv.config({path: './.env'})
const usersRouter = require('./routes/users.route');
const clientsRouter = require('./routes/clients.route')
const invoicesRouter = require('./routes/invoices.route')
const ErrorHandler = require('./middleware/error.middleware')
const { createResponse } = require('./utils/app.utils')
const { dailyAt8Job } = require('./cron/cron')
const { autoSendInvoicesJob }  = require('./jobs/invoice.jobs')


const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
dailyAt8Job(autoSendInvoicesJob)
app.use('/users', usersRouter);
app.use('/clients', clientsRouter)
app.use('/invoices', invoicesRouter)
app.use(ErrorHandler)
app.all('*', (req, res, next) => {
  return createResponse(res, 404, 
    {message: `Cannot ${req.method} ${req.originalUrl} on this server`} )
})
app.use(function(req, res, next) {
  next(createError(404, ));
});
module.exports = app;
