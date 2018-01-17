const express = require('express');
const morgan = require('morgan');
const { DATABASE_URL, PORT } = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const app = express();

const userRouter = require('./routers/userRouter');
const adminRouter = require('./routers/adminRouter');
const fileRouter = require('./routers/fileRouter');
const instructorRouter = require('./routers/instructorRouter');
const scheduleRouter = require('./routers/scheduleRouter');
const sessionRouter = require('./routers/sessionRouter');

app.use(morgan('common'));
app.use(express.static('public'));

app.use('/users', userRouter);
app.use('/admins', adminRouter);
app.use('/files', fileRouter);
app.use('/instructors', instructorRouter);
app.use('/schedules', scheduleRouter);
app.use('/sessions', sessionRouter);

let server;

function runServer(port = PORT, db = DATABASE_URL) {
  return new Promise((resolve, reject) => {
    mongoose.connect(db, (err) => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', (err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}


if (require.main === module) {
  runServer().catch(err => console.error(err));
}
