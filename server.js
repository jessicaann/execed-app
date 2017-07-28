var express = require('express');
var morgan = require('morgan');
const {DATABASE_URL, PORT} = require('./config');

var app = express();

var userRouter = require('./userRouter');
//var adminRouter = require('./admin-router');
//var fileRouter = require('./file-router');
//var instructorRouter = require('./instructor-router');
//var scheduleRouter = require('./schedule-router');
//var sessionRouter = require('./session-router');


app.use(morgan('common'));
app.use(express.static('public'));

//localhost/users
//localhost/users/12345
app.use('/users', userRouter);

var server;

function runServer(port=PORT) {
    server = app.listen(port, () => {
         console.log(`Your app is listening on port ${port}`);
    });
}

if(require.main === module){
    runServer()
}
