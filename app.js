require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const cron = require("node-cron");
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session);
const {updateViolationInfos} = require('./task/updateViolationInfos');

// Routers
const violationRouter = require('./routes/violation');


const app = express();

// logger
app.use(logger('dev'));
// const logFileName = path.join(__dirname, 'logs', 'access.log')
// const writeStream = fs.createWriteStream(logFileName, {
//   flags: 'a'
// })
// app.use(logger('combined', {
//   stream: writeStream
// }));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routers
app.use('/api/violation', violationRouter);

cron.schedule("*/2 * * * * *", async () => {
    console.log("---------------------");
    console.log(new Date(Date.now()).toISOString());
    const res = await updateViolationInfos();
    console.log(`${res.data.length} violations detected...`);
  });

module.exports = app;
