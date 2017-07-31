var express = require('express');
var morgan = require('morgan');
const {DATABASE_URL, PORT} = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var app = express();

var userRouter = require('./routers/userRouter');
var adminRouter = require('./routers/adminRouter');
var fileRouter = require('./routers/fileRouter');
var instructorRouter = require('./routers/instructorRouter');
var scheduleRouter = require('./routers/scheduleRouter');
var sessionRouter = require('./routers/sessionRouter');

app.use(morgan('common'));
app.use(express.static('public'));

app.use('/users', userRouter);
app.use('/admins', adminRouter);
app.use('/files', fileRouter);
app.use('/instructors', instructorRouter);
app.use('/schedules', scheduleRouter);
app.use('/sessions', sessionRouter);

var server;

function runServer(port=PORT, db=DATABASE_URL) {
    return new Promise((resolve, reject) => {
        mongoose.connect(db, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
            .on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}


if(require.main === module){
    runServer().catch(err => console.error(err));
}
