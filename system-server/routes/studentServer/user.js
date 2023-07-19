var express = require('express');
var router = express.Router();
const { login, 
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
        detailnickname } = require('../../whole/controller/studentServer/user')
const { SuccessModel, ErrorModel } = require('../../whole/model/resModel')

/* GET home page. */
router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  const result = login(username, password)
  return result.then(data => {
    if (data.username) {
      //设置session
      req.session.username = data.username
      req.session.nickname = data.nickname
      req.session.level = data.level
      req.session.juris = data.juris
      res.json(
        new SuccessModel()
      )
      return
    }
    res.json(
      new ErrorModel(`${username}`)
    )
  })
});

// 判断是否登录
router.get('/log', (req, res, next) => {
  if (req.session.username) {
    res.json({
      errno: 0,
      msg: req.session,
      msga: '已登录'
    })
    return
  }
  res.json({
    errno: -1,
    msg: '未登录'
  })
})

// 备忘录列表
router.get('/memo',(req,res,next) => {
  const author = req.session.username
  // const author = req.body.author
  // console.log(author);
  const result = memoselect(author)
  return result.then(list => {
    res.json(
      new SuccessModel(list)
    )
  })
})

// 添加备忘录事项
router.post('/inmemo',(req,res,next) => {
  const test = req.body.test
  const checked = false
  const author = req.session.username
  const result = memoinser(test, checked, author)
  return result.then(data => {
    if (data) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel('添加失败')
      )
    }
  })
})

// 删除备忘录事项
router.post('/memodel', (req,res,next) => {
  const id = req.body.id
  const author = req.session.username
  const result = memodel(id, author)
  return result.then(delData => {
    if (delData) {
      res.json(
        new SuccessModel()
      )
    }
    res.json(
      new ErrorModel('删除失败')
    )
  })
})

// 退出登录
router.get('/out',(req,res,next) => {
  req.session.destroy();
  if (!req.session) {
    res.json(
      new SuccessModel()
    )
  }
})

// 根据id查询详情
router.get('/userdata', (req,res,next) => {
  const id = req.query.id || ''
  const result = userdata(id)
  return result.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    }
  })
})

// 添加管理员
router.post('/insertuser', (req,res,next) => {
  const obj = {
    username: req.body.username,
    password: req.body.password,
    nickname: req.body.nickname,
    level: req.body.level,
    juris: req.body.juris
  }
  const require = insertuser(obj)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel()
      )
    }
  })
})

// 修改权限信息
router.post('/detailuser', (req,res,next) => {
  const obj = {
    id: req.body.id,
    juris: req.body.juris,
    level: req.body.level
  }
  const require = detailuser(obj)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    }
  })
})

// 重置密码
router.post('/resetpass', (req,res,next) => {
  const id = req.body.id
  const require = resetpass(id)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    }
  })
})

// 删除人员
router.post('/deluser', (req,res,next) => {
  const id = req.body.id
  const require = deluser(id)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel()
      )
    }
  })
})

// 测试用户名是否存在
router.get('/userrepeat', (req,res,next) => {
  const username = req.query.username
  const require = userrepeat(username)
  return require.then(data => {
    if (data.username) {
      res.json(
        new ErrorModel()
      )
    } else {
      res.json(
        new SuccessModel()
      )
    }
  })
})

// 判断旧密码是否正确
router.get('/pasrepeat', (req,res,next) => {
  const username = req.session.username
  const oldpass = req.query.oldpass
  const require = pasrepeat(username,oldpass)
  return require.then(data => {
    if (data.password) {
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

// 修改密码
router.post('/detailpass', (req,res,next) => {
  const username = req.session.username
  const newpass = req.body.newpass
  const require = detailpass(username,newpass)
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

// 修改昵称
router.post('/detailnickname', (req,res,next) => {
  const username = req.session.username
  const newnick = req.body.newnick
  const require = detailnickname(username,newnick)
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

module.exports = router;
