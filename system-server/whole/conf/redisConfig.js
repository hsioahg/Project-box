const redis = require('redis')
const redisOptions = require('./db')

const options = {
  host: redisOptions.host,
  port: redisOptions.port,
  password: redisOptions.password,
  detect_buffers: redisOptions.detect_buffers, // 传入buffer 返回也是buffer 否则会转换成String
  retry_strategy: function (options) {
    // 重连机制
    if (options.error && options.error.code === "ECONNREFUSED") {
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  }
}

// 生成redis的client
const client = redis.createClient(options)

// 存储值
const setValue = (key, value) => {
  if (typeof value === 'string') {
    client.set(key, value) 
  } else if (typeof value === 'object') {
    for (let item in value) {
      client.hmset(key, item, value[item], redis.print)
    }
  }
}

// 数据有效时间十分钟
const expireValue = (key, value) => {
  client.expire(key, value)
}

// key是否存在return 
const keytf = async (key) => {
  let value = await getValue(key)
  if (value == key ){
    return 1
  }else{
    return 0
  }
  // return client.exists(key)
}

// 获取string
const getValue = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, res) => {
      if (err) {
        reject(err)
      } else {
        // console.log(res)
        resolve(res)
      }
    })
  })
}

// 获取hash
const getHValue = (key) => {
  return new Promise((resolve, reject) => {
    client.hgetall(key, function (err, value) {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  })
}

// 导出
module.exports = {
  setValue,
  expireValue,
  getValue,
  getHValue,
  keytf
}