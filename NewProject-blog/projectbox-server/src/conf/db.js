const env = process.env.NODE_ENV //环境参数

//配置
let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456789',
    port: '3306',
    database: 'projectbox'
  }
  //redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if (env === 'prd') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456789',
    port: '3306',
    database: 'projectbox'
  }
  //redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF
}