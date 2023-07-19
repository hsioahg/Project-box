const env = process.env.NODE_ENV //环境参数

//配置
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
  //mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456789',
    port: '3306',
    database: 'student_system'
  }

  //redis
  REDIS_CONF = {
    port: 6379,
    host: 'localhost'
  }
}

if (env === 'production') {
  //mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456789',
    port: '3306',
    database: 'student_system'
  }

  //redis
  REDIS_CONF = {
    port: 6379,
    host: 'localhost'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
