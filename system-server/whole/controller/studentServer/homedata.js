const { exec, escape } = require('../../db/mysql')

const floordata = (biulding) => {
  biulding = escape(biulding)
  const sql = `SELECT s.*,b.room from studentdate s left join biuling b on (s.roomid=b.id) where b.biulding=${biulding} and s.state=6 GROUP BY s.sid;`
  return exec(sql)
}

const floordata1 = (biulding) => {
  biulding = escape(biulding)
  const sql = `SELECT s.*,b.room from studentdate s left join biuling b on (s.roomid=b.id) where b.biulding=${biulding} and s.state=9 GROUP BY s.sid;`
  return exec(sql)
}

const roomnum = (biulding) => {
  biulding = escape(biulding)
  const sql = `
  SELECT COUNT(*) AS rnum FROM biuling where biulding=${biulding} and floor='一楼'
  union all
  SELECT COUNT(*) FROM biuling where biulding=${biulding} and floor='二楼'
  union all
  SELECT COUNT(*) FROM biuling where biulding=${biulding} and floor='三楼'
  union all
  SELECT COUNT(*) FROM biuling where biulding=${biulding} and floor='四楼'
  union all
  SELECT COUNT(*) FROM biuling where biulding=${biulding} and floor='五楼'
  union all
  SELECT COUNT(*) FROM biuling where biulding=${biulding} and floor='六楼';
  `
  return exec(sql)
}

const studennum =(biulding) => {
  biulding = escape(biulding)
  const sql = `
  SELECT COUNT(s.sname) AS sname from biuling b left join studentdate s on (b.id=s.roomid) where b.biulding=${biulding} and b.floor='一楼'
  union all
  SELECT COUNT(s.sname) AS sname from biuling b left join studentdate s on (b.id=s.roomid) where b.biulding=${biulding} and b.floor='二楼'
  union all
  SELECT COUNT(s.sname) AS sname from biuling b left join studentdate s on (b.id=s.roomid) where b.biulding=${biulding} and b.floor='三楼'
  union all
  SELECT COUNT(s.sname) AS sname from biuling b left join studentdate s on (b.id=s.roomid) where b.biulding=${biulding} and b.floor='四楼'
  union all
  SELECT COUNT(s.sname) AS sname from biuling b left join studentdate s on (b.id=s.roomid) where b.biulding=${biulding} and b.floor='五楼'
  union all
  SELECT COUNT(s.sname) AS sname from biuling b left join studentdate s on (b.id=s.roomid) where b.biulding=${biulding} and b.floor='六楼';
  `
  return exec(sql)
}

const datenum = (biulding) => {
  biulding = escape(biulding)
  const sql = `
  SELECT COUNT(*)  AS bnum FROM biuling where biulding=${biulding}
  union all
  SELECT COUNT(s.sname) AS sname from biuling b left join studentdate s on (b.id=s.roomid) where b.biulding=${biulding};
  `
  return exec(sql)
}

const detailstudent = (keyword) => {
  const sql = `SELECT s.*,b.room from studentdate s left join biuling b on (s.roomid=b.id) where concat(sname,headmaster,room) like '%${keyword}%';`
  return exec(sql)
}

module.exports = {
  floordata,
  floordata1,
  roomnum,
  studennum,
  datenum,
  detailstudent
}