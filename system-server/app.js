var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

//erp系统
const erp_loginRouter = require('./routes/studentServer/user');
const erp_studentRouter = require('./routes/studentServer/student')
const erp_homedataRouter = require('./routes/studentServer/homedata')

// 多人博客系统
const blog_userRouter = require('./routes/multBlog/user');
const blog_homeRouter = require('./routes/multBlog/home');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./whole/db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'NoKey_833#',
  cookie: {
    // path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))

app.use('/api/blog/user', blog_userRouter);
app.use('/api/blog/home', blog_homeRouter);
app.use('/api/erp/user', erp_loginRouter);
app.use('/api/student', erp_studentRouter);
app.use('/api/erp/homedata', erp_homedataRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
