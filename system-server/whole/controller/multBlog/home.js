const { exec, escape } = require('../../db/mysql')

//轮播图内容
const chart = () => {
  const sql = `
    select * from chart
  `
  return exec(sql)
}

// 博客列表
const bloglist = (n,m,keyword) => {
  let sql = `select * from blog where concat(title,nickname,content) like '%${keyword}%' order by createtime desc limit ${(n-1) * m},${m}`
  console.log(sql);
  return exec(sql)
}

// 博客数量
const blognum = (keyword) => {
  const sql = `select COUNT(b.title) AS blognum from blog b where concat(title,nickname,content) like '%${keyword}%'`
  return exec(sql)
}

// 博客详情
const details = (id) => {
  id = escape(id)
  const sql = `select * from blog where id=${id}`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

// 新建博客
const newblog = (obj) => {
  obj.title = escape(obj.title)
  obj.content = escape(obj.content)
  obj.nickname = escape(obj.nickname)
  const sql = `insert into blog (title,content,createtime,nickname) values (${obj.title},${obj.content},${obj.createtime},${obj.nickname})`
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

// 个人中心博客列表
const adminblog = (n,m,nickname) => {
  nickname = escape(nickname)
  const sql = `select * from blog where nickname=${nickname} order by createtime desc limit ${(n-1) * m},${m}`
  return exec(sql)
}

// 个人中心博客列表数量
const adminblognum = (nickname) => {
  nickname = escape(nickname)
  const sql = `select COUNT(b.title) AS blognum from blog b where nickname=${nickname}`
  return exec(sql)
}

//修改博客
const updateblog = (id,obj) => {
  id = escape(id)
  obj.title = escape(obj.title)
  obj.content = escape(obj.content)
  obj.nickname = escape(obj.nickname)
  const sql = `update blog set title=${obj.title},content=${obj.content} where nickname=${obj.nickname} and id=${id}`
  return exec(sql).then(date => {
    if (date.changedRows > 0) {
      return true
    }
    return false
  })
}

// 删除博客
const delblog = (id,nickname) => {
  id = escape(id)
  nickname = escape(nickname)
  const sql = `
    delete from blog where id='${id}' and nickname=${nickname}
  `
  return exec(sql)
}

module.exports = {
  chart,
  bloglist,
  blognum,
  details,
  newblog,
  adminblog,
  adminblognum,
  updateblog,
  delblog
}