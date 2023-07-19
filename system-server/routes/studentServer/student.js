var express = require('express');
var router = express.Router();
const { 
      studentdate,
      delstudent, 
      newstudent,
      addDormitory, 
      studentdetails,
      updatehead, 
      updatestate,
      updatestudent,
      emptydormitory } = require('../../whole/controller/studentServer/studentdata');
const { SuccessModel, ErrorModel } = require('../../whole/model/resModel')

//宿舍学生列表
router.get('/studentdate',(req,res,next) => {
  const biulding = req.session.juris
  const floor = req.query.floor
  const result = studentdate(biulding,floor)
  return result.then(delData => {
    delData.forEach(item => {
      item.student = []
      if (item.sid) {
        item.sname.split(',').forEach((name, i) => {
          const arr = item.sid.split(',')
          let obj = {id: arr[i], name}
          item.student.push(obj)
        })
      }
    })
    
    if (delData) {
      res.json(
        new SuccessModel(delData)
      )
    }
  })
})

//删除学生
router.get('/delstudent', (req,res,next) => {
  const id = req.query.id
  console.log('this'+id);
  const result = delstudent(id)
  return result.then(delData => {
    if (delData) {
      res.json(
        new SuccessModel(delData)
      )
    }
  })
})

//添加学生
router.post('/newstudent', (req,res,next) => {
  const obj = {
    sname: req.body.sname,
    major: req.body.major,
    sclass: req.body.sclass,
    phone: req.body.phone,
    headmaster: req.body.headmaster,
    masterphone: req.body.masterphone,
    roomid: req.body.roomid
  }

  const result = newstudent(obj)
  return result.then(data => {
    console.log(data);
    if (data) {
      res.json(
        new SuccessModel(data)
      )
      return
    }
    res.json({
      code:-1,
      msg:"失败"
    })
  })
})

//添加宿舍
router.post('/newdormitory', (req,res,next) => {
  const biulding = req.session.juris
  const floor = req.body.floor
  const room = req.body.room
  const require = addDormitory(biulding,floor,room)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
      return
    }
    res.json(
      new ErrorModel()
    )
  })
})

//学生信息
router.get('/studentdetail', (req,res,next) => {
  const sid = req.query.sid
  const require = studentdetails(sid)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
      return
    }
    res.json(
      new ErrorModel()
    )
  })
})

//修改宿舍长
router.post('/updatedhead', (req,res,next) => {
  const id = req.body.id
  const biulding = req.session.juris
  const dhead = req.body.dhead
  const require = updatehead(id,biulding,dhead)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    } else {
      res.json(
        new ErrorModel()
      )
    }
    
  })
})

//修改学生状态
router.post('/updatestate',(req,res,next) => {
  const sid = req.body.sid
  const state = req.body.state
  const require = updatestate(sid,state)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel()
      )
    }
  })
})

// 修改学生信息
router.post('/updatestudent', (req,res,next) => {
  const obj = {
    sid: req.body.sid,
    sname: req.body.sname,
    major: req.body.major,
    sclass: req.body.sclass,
    phone: req.body.phone,
    headmaster: req.body.headmaster,
    masterphone: req.body.masterphone
  }
  const require = updatestudent(obj)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    } else {
      res.json(
        new ErrorModel()
      )
    }
  })
})

//请空宿舍
router.get('/emptydorstu', (req,res,next) => {
  const id = req.query.thisroomid
  const require = emptydormitory(id)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel()
      )
    }
  })
})

module.exports = router;