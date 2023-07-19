const { exec, escape } = require('../../db/mysql')
const { genPassword } = require('../../utils/cryp')

// 登录
const login = (email, password) => {
  username = escape(email)
  // 生成加密密码
  password = genPassword(password)
  password = escape(password)
  const sql = `
    select email, nickname from users where email='${email}' and password=${password}
  `
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

// 测试用户是否存在
const niken = (nickname) => {
  nickname = escape(nickname)
  const sql = `select nickname from users where nickname=${nickname}`
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

// 测试邮箱是否被使用
const mailCheck = (email) => {
  email = escape(email)
  const sql = `select email from users where email=${email}`

  console.log(sql);
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}



module.exports = {
  login,
  niken,
  mailCheck,
}
