var express = require('express');
var app = express();
var db = require('./database');

var userRouter = require('./user-router');
var adminRouter = require('./admin-router');
var fileRouter = require('./file-router');
var instructorRouter = require('./instructor-router');
var scheduleRouter = require('./schedule-router');
var sessionRouter = require('./session-router');


app.use(express.static('public'));
app.listen(process.env.PORT || 8080);