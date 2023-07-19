const { exec, escape } = require('../conf/mysql')
const { genPassword } = require('../utils/cryp')

//登录
const login = (email, password) => {
  email = escape(email)
  password = genPassword(password)
  password = escape(password)
  const sql = `
    select email, nickname, headimg from users where email=${email} and password=${password}
  `
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

// 测试用户是否存在
const niken = (nickname) => {
  nickname = escape(nickname)
  const sql = `select nickname from users where nickname=${nickname}`
  console.log(sql);
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

// 测试邮箱是否被使用
const mailCheck = (email) => {
  email = escape(email)
  const sql = `select email from users where email=${email}`
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

// 注册帐号
const register = (email, vercode, nickname, password) => {
  email = escape(email)
  vercode = escape(vercode)
  nickname = escape(nickname)
  password = genPassword(password)
  password = escape(password)
  const sql = `insert into users (email, password,  nickname) values (${email},${password},${nickname})`
  return exec(sql).then(data => {
    return data[0] || {}
  })
}

// 忘记密码
const retpass = (retemail, vercode, newpass1) => {
  retemail = escape(retemail)
  vercode = escape(vercode)
  newpass1 = genPassword(newpass1)
  newpass1 = escape(newpass1)
  const sql = `update users set password=${newpass1} where email=${retemail}`
  return exec(sql)
}

//获取用户信息
const userlog = (useremail) => {
  useremail = escape(useremail)
  const sql = `select id, email, nickname, headimg from users where email=${useremail}`
  return exec(sql)
}

module.exports = {
  login,
  niken,
  mailCheck,
  register,
  retpass,
  userlog
}