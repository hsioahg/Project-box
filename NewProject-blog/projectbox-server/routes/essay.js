var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../src/model/resModel')
const multer = require('multer')
const {jwtAuth,jwtError} = require('../src/utils/jwt')
const path = require('path')
const fs = require('fs')
const { 
  setblog  
} = require('../src/controller/essay')


router.use(jwtAuth)
router.use(jwtError)

//上传封面图片
router.post('/coverimg', multer({ dest: 'D:/phpstudy_pro/WWW/imgs' }).single('coverfile'),
  (req,res,next) => {
    if (req.file) {
      res.json({
          url:'http://localhost:8085/imgs/'+req.file.filename,
          name: req.file.filename
        }
      )
    }
  }
)
//删除封面图片
router.post('/delcoverimg',(req, res, next) => {
  const { filename } = req.body
  console.log(filename);
  fs.unlink(path.join('D:/phpstudy_pro/WWW/imgs', filename),(err) => {
    if (err) {
      res.json(
        new ErrorModel('删除失败')
      )
    } else {
      res.json(
        new SuccessModel('删除成功')
      )
    }
  })
})

//上传文章图片
router.post('/blogimg', multer({ dest: 'D:/phpstudy_pro/WWW/blogimgs' }).single('blogfile'),
  (req,res,next) => {
    if (!req.file) {
      res.json(
        {
          "errno": 1, // 只要不等于 0 就行
          "message": "上传失败"
        }
      )
    } else {
      res.json(
        {
          "errno": 0, // 注意：值是数字，不能是字符串
          "data": {
            "url": 'http://localhost:8085/blogimgs/'+req.file.filename,
          }
        }
      )
    }
  }
)

//写文章
router.post('/setblog', (req,res,next) => {
  const { title, imgurl, radio1, radio2, essaybody, nickname } = req.body
  console.log(req.body);
  const result = setblog(title, imgurl, radio1, radio2,essaybody, nickname)
  return result.then(data => {
    if (data === 1) {
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