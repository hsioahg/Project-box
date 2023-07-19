const { exec, escape } = require('../../db/mysql')

//查询宿舍以及对应的学生
const studentdate = (biulding,floor) => {
  biulding = escape(biulding)
  floor = escape(floor)
  const sql = `SELECT b.*,GROUP_CONCAT(s.sid) AS sid,GROUP_CONCAT(s.sname) AS sname from biuling b left join studentdate s on (b.id=s.roomid) where b.biulding=${biulding} and b.floor=${floor} GROUP BY b.id order by b.room asc;`
  return exec(sql)
}

//删除学生
const delstudent = (id) => {
  id = escape(id)
  const sql = `delete from studentdate where sid = ${id}`
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })
}

//添加学生
const newstudent = (obj) => {
  obj.sname = escape(obj.sname)
  obj.major = escape(obj.major)
  obj.sclass = escape(obj.sclass)
  obj.phone = escape(obj.phone)
  obj.headmaster = escape(obj.headmaster)
  obj.masterphone = escape(obj.masterphone)
  const sql = `insert into studentdate (sname,major,sclass,phone,headmaster,masterphone,state,roomid) values (${obj.sname},${obj.major},${obj.sclass},${obj.phone},${obj.headmaster},${obj.masterphone},'3',${obj.roomid})`
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

// 添加宿舍
const addDormitory = (biulding,floor,room) => {
  biulding = escape(biulding)
  floor = escape(floor)
  room = escape(room)
  const sql = `insert into biuling (biulding,floor,room,dhead) values (${biulding},${floor},${room},'无')`
  console.log(sql);
  return exec(sql)
}

//学生信息
const studentdetails = (sid) => {
  sid = escape(sid)
  const sql = `select * from studentdate where sid=${sid}`
  console.log(sql);
  return exec(sql).then(rows => {
    return rows[0]
  })
}

//修改宿舍长
const updatehead = (id,biulding,dhead) => {
  id = escape(id)
  biulding = escape(biulding)
  dhead = escape(dhead)
  const sql = `update biuling set dhead=${dhead} where id=${id} and biulding=${biulding}`
  return exec(sql)
}

// 修改学生状态
const updatestate = (sid,state) => {
  sid = escape(sid)
  state = escape(state)
  const sql = `update studentdate set state=${state} where sid=${sid}`
  return exec(sql)
}

// 修改学生信息
const updatestudent = (obj) => {
  obj.sid = escape(obj.sid)
  obj.sname = escape(obj.sname)
  obj.major = escape(obj.major)
  obj.sclass = escape(obj.sclass)
  obj.phone = escape(obj.phone)
  obj.headmaster = escape(obj.headmaster)
  obj.masterphone = escape(obj.masterphone)
  const sql = `update studentdate set sname=${obj.sname},major=${obj.major},sclass=${obj.sclass},phone=${obj.phone},headmaster=${obj.headmaster},masterphone=${obj.masterphone} where sid=${obj.sid}`
  return exec(sql).then(date => {
    // console.log(date.changedRows);
    if (date.changedRows > 0) {
      return true
    }
    return false
  })
}

// 移除宿舍及宿舍成员
const emptydormitory = (id) => {
  id = escape(id)
  const sql = `
  delete b,s from biuling b left join studentdate s on b.id=s.roomid where b.id=${id} or s.roomid=${id}
  `
  return exec(sql)
}

module.exports = {
  studentdate,
  delstudent,
  newstudent,
  addDormitory,
  studentdetails,
  updatehead,
  updatestate,
  updatestudent,
  emptydormitory
}