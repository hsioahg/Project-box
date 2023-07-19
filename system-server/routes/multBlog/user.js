var express = require('express');
var router = express.Router();
const { login,
        niken,
        mailCheck } = require('../../whole/controller/multBlog/user')
const { SuccessModel, ErrorModel } = require('../../whole/model/resModel')
const { genPassword } = require('../../whole/utils/cryp')
const redis = require('../../whole/conf/redisConfig')
const nodemailer = require('nodemailer')
const { exec, escape } = require('../../whole/db/mysql')

//登录
router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  console.log(email);
  console.log(password);
  const result = login(email, password)
  return result.then(data => {
    if (data.email) {
      //设置session
      req.session.email = data.email
      req.session.nickname = data.nickname
      res.json(
        new SuccessModel(data)
      )
      return
    }
    res.json(
      new ErrorModel(`${email}`)
    )
  })
});

//发送邮箱验证码
router.post('/getemail', (req, res, next) => {
  let code = Math.floor(Math.random() * 900000) + 100000
  // console.log(code)
  const { email } = req.body
  // console.log(email);
  // 建立一个smtp连接
  let transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    secureConnection: true,
    port: 465,
    auth: {
      user: 'r2628758793@163.com',
      pass: 'PVGFYMTJWJPKIQNE',
    }
  })
  // 配置相关参数
  let options = {
    from: 'r2628758793@163.com',
    to: `${email}`,
    subject: '邮箱注册验证码',
    html: `<div style="
    width: 400px;
    height: 400px;
    background-color: rgb(67, 67, 67);
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 45px;
  ">
    <h1 style="
      text-align: center;
      color: aliceblue;
    ">欢迎注册</h1>
    <span style="
      display: inline-block;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 30px;
      width: 306px;
      color: aliceblue;
      font-size: 20px;
    ">尊敬的用户，您本次的验证码为：</span>
    <h2 style="
      text-align: center;
      color: aliceblue;
    ">${code}</h2>
    <span style="
      display: inline-block;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 15px;
      width: 306px;
      color: aliceblue;
      font-size: 20px;
    ">此验证码用于注册。本验证码10分钟内有效，请尽快输入，感谢您的使用。</span>
  </div>`
  }
  transporter.sendMail(options, (err, msg) => {
    if (err) {
      console.log(err);
    } else {
      redis.setValue(`${email}-${code}`,`${email}-${code}`);
      redis.expireValue(`${email}-${code}`, 600)
    }
  })
})

//查询昵称是否重复
router.post('/nick', (req, res, next) => {
  const { nickname } = req.body
  const result = niken(nickname)
  return result.then(data => {
    if (data.nickname) {
      res.json(
        new ErrorModel('用户已存在')
      )
      return
    }
    res.json(
      new SuccessModel()
    )
  })
});

//查询邮箱是否重复
router.post('/mailcheck', (req, res, next) => {
  const { email } = req.body
  const result = mailCheck(email)
  return result.then(data => {
    if (data.email) {
      res.json(
        new ErrorModel('该邮箱已被注册')
      )
      return
    }
    res.json(
      new SuccessModel()
    )
  })
});

// 用户注册
router.post('/uregis', async (req, res, next) => {
  const { email, vercode, nickname, password  } = req.body
  const inemail = escape(email)
  const nick = escape(nickname)
  const pass = escape(genPassword(password))

  let key = await redis.keytf(`${email}-${vercode}`)
  if (key === 0) {
    res.json(
      new ErrorModel('验证码错误')
    )
  } else {
    res.json(
      new SuccessModel()
    )
    const sql = `insert into users (email, password,  nickname) values (${inemail},${pass},${nick})`
    return exec(sql)
  }
  
})

// 判断是否登录
router.get('/log', (req, res, next) => {
  if (req.session.email) {
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


module.exports = router;
