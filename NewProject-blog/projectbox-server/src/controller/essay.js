const { exec, escape } = require('../conf/mysql')

const setblog = (title,imgurl,titletype,range,essaybody,author,time) => {
  title = escape(title)
  titleimg = escape(imgurl)
  titletype = escape(titletype)
  essayrange = escape(range)
  essaybody = escape(essaybody)
  author = escape(author)
  time = escape(new Date())
    const sql = `
      insert into essay (title, titleimg,  titletype, essayrange,essaybody,author,time) values (${title},${titleimg},${titletype},${range},${essaybody},${author},${time})
    `
  return exec(sql).then(data => {
    return data.affectedRows
  })
}

module.exports = {
  setblog
}