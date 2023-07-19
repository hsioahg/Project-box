const { exec, escape } = require('../../db/mysql')
const { genPassword } = require('../../utils/cryp')

//登录
const login = (username, password) => {
  username = escape(username)
  // 生成加密密码
  password = genPassword(password)
  password = escape(password)
  const sql = `
    select username,nickname,level,juris from userlogin where username=${username} and password=${password}
  `
  console.log('sql is', sql)
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

//查询备忘录
const memoselect = (author) => {
  author = escape(author)
  const sql = `
  select * from memo where author=${author} order by id desc;
  `
  return exec(sql)
}

//添加备忘事件
const memoinser = (test, checked, author) => {
  test = escape(test)
  check = escape(checked)
  author = escape(author)
  const sql = `
    insert into memo (test,checked,author) values (${test},'${checked}',${author})
  `
  return exec(sql).then(row => {
    return row[0] || {}
  })
}

// 删除备忘事件
const memodel = (id,author) => {
  const sql = `
    delete from memo where id='${id}' and author='${author}'
  `
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })
}

// 查询所有用户
const userdata = (id) => {
  let sql = `
    select * from userlogin where 1=1 
  `
  if (id) {
    sql += `and id=${id} `
  }
  sql += `order by id desc;`
  return exec(sql)
}

// 添加用户
const insertuser = (obj) => {
  obj.username = escape(obj.username)
  obj.nickname = escape(obj.nickname)
  obj.level = escape(obj.level)
  obj.juris = escape(obj.juris)
  obj.password = genPassword(obj.password)
  const sql = `
    insert into userlogin (username,password,nickname,level,juris) values (${obj.username},'${obj.password}',${obj.nickname},${obj.level},${obj.juris})
  `
  return exec(sql)
}

// 更改用户权限
const detailuser = (obj) => {
  obj.id = escape(obj.id)
  obj.juris = escape(obj.juris)
  obj.level = escape(obj.level)
  const sql = `
    update userlogin set juris=${obj.juris},level=${obj.level} where id=${obj.id}
  `
  return exec(sql).then(date => {
    if (date.changedRows > 0) {
      return true
    }
    return false
  })
}

// 重置密码
const resetpass = (id) => {
  id = escape(id)
  passnum = genPassword(123456)
  const sql = `
    update userlogin set password='${passnum}' where id=${id}
  `
  return exec(sql)
}

// 移除人员
const deluser = (id) => {
  id = escape(id)
  const sql = `
    delete from userlogin where id=${id}
  `
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })
}

// 判断用户名是否被占用
const userrepeat = (username) => {
  username = escape(username)
  const sql = `
    select username from userlogin where username=${username}
  `
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

// 验证旧密码
const pasrepeat = (username,oldpass) => {
  username = escape(username)
  oldpass = genPassword(oldpass)
  const sql = `
    select password from userlogin where username=${username} and password='${oldpass}'
  `
  console.log(sql);
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}
// 修改密码
const detailpass = (username, newpass) => {
  username = escape(username)
  newpass = escape(genPassword(newpass))
  const sql = `
    update userlogin set password=${newpass} where username=${username}
  `
  return exec(sql)
}

// 修改昵称
const detailnickname = (username, newnick) => {
  username = escape(username)
  newnick = escape(newnick)
  const sql = `
    update userlogin set nickname=${newnick} where username=${username}
  `
  console.log(sql);
  return exec(sql)
}

module.exports = {
  login,
  memoselect,
  memoinser,
  memodel,
  userdata,
  insertuser,
  detailuser,
  resetpass,
  deluser,
  userrepeat,
  pasrepeat,
  detailpass,
  detailnickname
}
