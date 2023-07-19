var express = require('express');
var router = express.Router();
const { 
  chart,
  bloglist,
  blognum,
  details,
  newblog,
  adminblog,
  adminblognum,
  updateblog,
  delblog } = require('../../whole/controller/multBlog/home')
const { SuccessModel, ErrorModel } = require('../../whole/model/resModel')
const multer = require('multer')

//轮播图内容
router.get('/chart', (req,res,next) => {
  const require = chart()
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

// 渲染博客列表
router.get('/list', (req, res, next) => {
  const n = req.query.n
  const m = req.query.m
  const keyword = req.query.keyword || ''
  const result = bloglist(n,m,keyword)
  return result.then(listData => {
    res.json(
      new SuccessModel(listData)
    )
  })
})

//数据条数
router.get('/blognum', (req,res,next) => {
  const keyword = req.query.keyword || ''
  const require = blognum(keyword)
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

// 博客详情
router.get('/details', (req,res,next) => {
  const id = req.query.id
  const require = details(id)
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

// 新建博客
router.post('/newblog', (req,res,next) => {
  const id = req.body.id
  const obj = {
    nickname: req.session.nickname,
    content: req.body.content,
    title: req.body.title,
    createtime: Date.now()
  }
  let require = ''
  if (id) {
    require = updateblog(id,obj)
  } else {
    require = newblog(obj)
  }
  return require.then(data => {
    console.log(data);
    if (data) {
      res.json(
        new SuccessModel()
      )
      return
    }
    res.json(
      new ErrorModel()
    )
  })
})

// 上传图片
router.post('/img', multer({ dest: 'D:/imgs' }).single('file'),
  (req, res, next) => {
    if (req.file.filename) {
      res.json({
        "errno": 0, // 注意：值是数字，不能是字符串
        "data": {
          "url": 'http://192.168.31.126:8097/'+req.file.filename,
        }
      })
      return
    }
    res.json({
      "errno": 1,
      "message": "失败信息"
    })
  }
)

// 个人中心博客列表
router.get('/adminblog', (req,res,next) => {
  const n = req.query.n
  const m = req.query.m
  const nickname = req.session.nickname
  const require = adminblog(n,m,nickname)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
      return
    }
    res.json(
      ErrorModel()
    )
  })
})

// 个人中心博客列表数量
router.get('/adminblognum', (req,res,next) => {
  const nickname = req.session.nickname
  const require = adminblognum(nickname)
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

// 删除学生
router.post('/delblog', (req,res,next) => {
  const id = req.body.id
  const nickname = req.session.nickname
  const require = delblog(id,nickname)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel()
      )
      return
    }
    res.json(
      new ErrorModel()
    )
  })
})

module.exports = router;